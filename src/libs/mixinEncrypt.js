/**
 * created in 2019-4-18
 * author:liguixing<www.liguixing.com>
 * description:简单的加密解密功能，用于浏览器存储用户登录信息
 */
const mixinEncrypt = {
  specialStr:"!\"#$%&'()*+,-./::;<=>?@[\\]^_`{|}~", // 特殊字符，用前后替换法，所以多了一个中间位 ":"
  mixins:['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789','UVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRST'],
  encrypt:function(encryptStr){
    let s = encryptStr;
    const specialStr = this.specialStr;
    const str = this.mixins[0];
    const pwd = this.mixins[1];
    let rstr = '';
    for(let i = 0;i<3;i++){
      rstr += str.charAt(Math.floor(Math.random()*str.length));
    }
    for(let i = 0;i<s.length;i++){
      let idsStr = s.charAt(i);
      //处理普通字符
      if(str.indexOf(idsStr)>=0){
        if(i%2==0){
          rstr += pwd.charAt(str.indexOf(idsStr));
        }else{
          let code = idsStr.charCodeAt(0);
          //大写
          if(code >= 65 && code <= 90){
            rstr += String.fromCharCode(code+32);
          }else if(code >= 97 && code <= 122){
            rstr += String.fromCharCode(code-32);
          }else{
            rstr += idsStr;
          }
        }
      }
      //处理特殊字符
      else if(specialStr.indexOf(idsStr)>=0){
        let index = specialStr.indexOf(idsStr); //0-32共33个数
        //如果出现在后半段
        if(index > 16){
          //位置在偶数位，16减，位置在奇数位，0+
          rstr += i%2 == 0 ? specialStr.charAt(16-(index-16)) : specialStr.charAt(index-16);
        //如果出现在前半段
        }else{
          //位置在偶数位，32减，位置在奇数位，16+
          rstr += i%2 == 0 ? specialStr.charAt(32-(16-index)) : specialStr.charAt(16+(16-index));
        }
      }
      else{
        rstr+=idsStr;
      }
    }
    return rstr;
  },
  unEncrypt:function(unEncryptStr){
    let s = unEncryptStr.substring(3);
    const specialStr = this.specialStr;
    const str = this.mixins[0];
    const pwd = this.mixins[1];
    let rstr = '';
    for(let i = 0;i<s.length;i++){
      let idsStr = s.charAt(i);
      //处理普通字符
      if(pwd.indexOf(idsStr)>0){
        if(i%2==0){
          rstr += str.charAt(pwd.indexOf(idsStr));
        }else{
          let code = idsStr.charCodeAt(0);
          //大写
          if(code >= 65 && code <= 90){
            rstr += String.fromCharCode(code+32);
          }else if(code >= 97 && code <= 122){
            rstr += String.fromCharCode(code-32);
          }else{
            rstr += idsStr;
          }
        }
      }
      //处理特殊字符
      else if(specialStr.indexOf(idsStr)>=0){
        let index = specialStr.indexOf(idsStr);//0-32共33个数
        //如果出现在后半段，说明之前出现在前半段
        if(index > 16){
          rstr += i%2 == 0 ? specialStr.charAt(index-16) : specialStr.charAt(32-index);
        }else{
          rstr += i%2 == 0 ? specialStr.charAt(32-index) : specialStr.charAt(16+index);
        }
      }
      else{
        rstr+=idsStr;
      }
    }
    return rstr;
  }
};

export default mixinEncrypt;