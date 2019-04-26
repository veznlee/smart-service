import axios from 'axios'
import {Message} from 'iview';
// import qs from 'qs'
import local from './local'
import {urlConfig,appConfig} from '@/config/index'
import router from '@/router/index'

/**
 *  用于当一个页面有多个请求同时连接失败时，控制只弹出一个错误提示
 */
 const HttpErrorControl = function(){
    this.lastErrorTime = 0;
    this.errorTimeSpace = 2;
 }
 HttpErrorControl.prototype.error = function(){
    const time = (new Date()).getTime();
    if((time - this.lastErrorTime)/1000 <= this.errorTimeSpace) return;
    this.lastErrorTime = time;
    Message.error({
        content:'请求超时！',
        duration: 2
    });
}
const httpErrorControl = new HttpErrorControl();

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}

//当创建一个实例时进行默认设置
let tokenInstance = axios.create({
    baseURL:urlConfig.serverUrl
});
tokenInstance.interceptors.request.use(function(config){
    // 添加token
    if(config.noToken){
        delete config.noToken;
    }else{
        const token = local.getLocal(appConfig.appTokenName) || '';
        config.headers.token = token;
    };
    if(config.method === 'post') {
        config['headers']['Content-Type'] = 'application/json';
    }
    if(config.method === 'file') {
        config.method = 'post';
        if(config.isUpdate){
            config.method = 'put';
            delete config.isUpdate;
        }
        config['headers']['Content-Type'] = 'multipart/form-data';
    }
    return config;
},function(error){
    return Promise.reject(error);
});

// 对响应数据做点什么
tokenInstance.interceptors.response.use(function (response) {
    if(response.data.code*1 == -1){
        toLogin();
        return;
    }else{
        return response.data;
    }
}, function (error) {
    httpErrorControl.error();
    return Promise.reject(error);
});

/**
 * 提交表单数据
 * */
let tokenFormInstance = axios.create({
    baseURL:urlConfig.serverUrl,
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function(data, headers){
        let ret = '';
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
        }
        return ret;
    }]
});
tokenFormInstance.interceptors.request.use(function(config){
    if(config.noToken){
        delete config.noToken;
    }else{
        const token = local.getLocal(appConfig.appTokenName) || '';
        config.headers.token = token;
    };
    return config;
},function(error){
    return Promise.reject(error);
});
tokenFormInstance.interceptors.response.use(function (response) {
    if(response.data.code*1 == -1){
        toLogin();
    }else{
        return response.data;
    }
}, function (error) {
    httpErrorControl.error();
    return Promise.reject(error);
});

let downloadFileByAjax = function(filePath){
    const token = local.getLocal(appConfig.appTokenName) || '';
    axios({
        method: 'post',
        url: urlConfig.serverUrl+urlConfig.fileDownload,
        params: {filePath,token},
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        responseType:'blob'
    })
    .then(response => {
        // 转换为base64，可以直接放入a表情href
        if(response.data.type === 'application/force-download'){
            var reader = new FileReader();
            reader.readAsDataURL(response.data);
            reader.onload = function (e) {
                let fileName;
                console.log(filePath+"");
                if(filePath.indexOf("\\") > -1){
                    fileName = filePath.split("\\").pop();
                }else if(filePath.indexOf("/") > -1){
                    fileName = filePath.split("/").pop();
                }else{
                    fileName = filePath;
                }
                // 转换完成，创建一个a标签用于下载
                var a = document.createElement('a');
                a.download = fileName;
                a.href = e.target.result;
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                a.parentNode.removeChild(a);
            }
        }else{
            Message.warning('文件下载失败');
        }
        //resolve(response.data);
    }).catch(err => {
        httpErrorControl.error('请求超时！');
    })
}

let downloadFile = function(filePath){
    // const token = local.getLocal(appConfig.appTokenName) || '';
    let a = document.createElement('a');
    a.href = urlConfig.serverUrl+filePath;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.parentNode.removeChild(a);
}


export {tokenInstance, tokenFormInstance, downloadFileByAjax, downloadFile}