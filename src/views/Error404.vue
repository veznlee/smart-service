<template>
  <div class="notfoud-container">
    <div class="img-404"></div>
    <p class="notfound-p">哎呀，您好像迷路啦...</p>
    <div class="notfound-reason">
      <p>可能的原因：</p>
      <ul>
        <li>原来的页面不存在了</li>
        <li>我们的服务器被外星人劫持了</li>
      </ul>
    </div>
    <div class="notfound-btn-container">
      <router-link class="notfound-btn" :to="{name:'home'}">返回首页</router-link>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .notfoud-container{
    padding-top:100px;
    .img-404{height:155px;background:url(../assets/img/page-404_bg.png) center center no-repeat;
    background-size:150px auto;margin-bottom:20px}
    .notfound-p{line-height:22px;font-size:18px;padding-bottom:20px;border-bottom:1px solid #f6f6f6;
    text-align:center;color:#262b31}
    .notfound-reason{color:#9ca4ac;font-size:16px;line-height:20px;text-align:left;width:260px;margin:0 auto}
    .notfound-reason p{margin-top:13px}
    .notfound-reason ul li{margin-top:10px;margin-left:36px;list-style: disc;}
    .notfound-btn-container{
      margin:40px auto 0;text-align:center;
      .notfound-btn{
        display:inline-block;border:1px solid #ebedef;background-color:#239bf0;color:#fff;font-size:15px;
        border-radius:5px;text-align:center;padding:10px;line-height:16px;white-space:nowrap
      }
    }
  }
</style>