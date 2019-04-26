const __config = {
  production:{//
    // 网站根目录
    baseUrl:'http://116.62.243.51:8082/',
    // 网站首页
    webIndex:'http://116.62.243.51:8082/',
    // 请求路径
    serverUrl:'http://116.62.243.51:8082/',
    // 图片根路径
    imgUrl:'http://116.62.243.51:8082/'
  },
  dev:{
    // 网站根目录
    baseUrl:'http://192.168.0.106:8081/',
    // 网站首页
    webIndex:'http://192.168.0.106:8081/',
    // 请求路径
    serverUrl:'http://192.168.0.106:8081/',
    // 图片根路径
    imgUrl:'http://192.168.0.106:8081/'
  }
}

let __mode = process.env.NODE_ENV === 'production' ? __config.production : __config.dev;

export const urlConfig = Object.assign(__mode,{
  // 文件下载
  fileDownload:'bs/downloadFile',
  // 登录
  login:'sys/user/ajaxLogin',
  loginByCode:'sys/user/code/ajaxLogin',
  getLoginCode:'sys/msg/',
  // 登出
  loginOut:'sys/user/loginOut',
  // 数据字典
  dataList:'sys/dictDatas/',
  dataListType:{
    sex:1,
    habit:2,
    signFileType:3,
    fileType:4,
    workUnit:5,
    workPost:6,
    nation:8,
    educationalBg:9,//学历
    university:10,
    maritalStatus:12,//婚姻状况
    politicalAspect:14,//政治面貌,
    personJobState:15
  },
  // 文件上传
  fileUpload:'problem/uploadProfiles'
})


export const appConfig = {
  appTitle:'纪检政务及政治研判',
  appTokenName:'ftuidake', //一种混淆的做法
  appLoginUserName:'ferusdake',
  cookieExpires: 1,
  useI18n: false,
  pageConfig:{
    page:1,
    pageSize:10,
    maxSize:5,
    total:0,
    //可选的每页数据数目
    pageSelect:[10,15,20]
  },
  // 接收上传的文档类型
  acceptDocFiles:'.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  homeName:'home',
  HOME_PAGE_NAME : 'home',
  LOGIN_PAGE_NAME : 'login',
  REGISTER_PAGE_NAME : 'register',
  NOFOUND_PAGE_NAME : 'error_404',
  ERROR_PAGE_NAME : 'error_401',
  // 没有token就能访问的页面
  NO_NEED_TOKEN_PAGES:['home','about','login','register','error_404','error_401','scan'],
  // 没有在权限里面配置，但必须要有token才能访问的页面
  NO_NEED_PERMISSION_PAGES:['home','jd-person-detail','gl-person-detail','manage-account-detail']
}