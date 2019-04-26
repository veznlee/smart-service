(function() {
  /**
   * IE9
   *  */
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }
  if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function() {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
  if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
    clearTimeout(id);
  };

  if(Number.parseInt === undefined) Number.parseInt = window.parseInt;
  if(Number.parseFloat === undefined) Number.parseFloat = window.parseFloat;
}());

import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import store from '@/store/index.js'
import './registerServiceWorker'

import {urlConfig,appConfig} from './config'
import axios from 'axios'
import {tokenInstance, tokenFormInstance, downloadFile} from '@/libs/tokenHttp.js'
import domMethod from '@/libs/dom-method.js'
import storage from '@/libs/local.js'
import {DelayWarning,DelayError} from '@/libs/ivuMessage.js' //自定义全局提示插件

/**
 * 使用iview
 */
import iView from 'iview';
import 'iview/dist/styles/iview.css';   
import './theme/main.less';
import './assets/app.scss';
Vue.use(iView);

Vue.config.productionTip = false

/**
 * Vue扩展
 */
Vue.prototype.$urlConfig = urlConfig
Vue.prototype.$appConfig = appConfig
Vue.prototype.$http = axios
Vue.prototype.$storage = storage
Vue.prototype.$thttp = tokenInstance
Vue.prototype.$tform = tokenFormInstance
Vue.prototype.$downFile = downloadFile
Vue.prototype.$DelayWarning = DelayWarning //自定义全局提示
Vue.prototype.$DelayError = DelayError //自定义全局提示
Vue.prototype.$dom = domMethod //简单的dom操作方法
/**
 * 通用指令和过滤器注册
 */
import importDirective from './directive'
import importFilter from './filter'
Vue.use(importDirective)
Vue.use(importFilter)
/**
 * 通用组件
 */
import ChartBlock from './components/chart-block.vue'
Vue.use(ChartBlock)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
