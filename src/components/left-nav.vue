<template>
  <div class="frame-left-wrap">
    <div class="wrap-header">
      <h1>服务区智能分析决策系统</h1>
      <div class="user-info">
        <div class="user-header">
          <img :src="`${publicPath}static/images/user_head.png`" alt="用户头像">
        </div>
        <p class="user-name">admin</p>
        <div class="user-about">
          <span class="login-out">
            <i class="ivu-icon ivu-icon-md-power"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="wrap-main">
      <div class="nav-container">
        <ul class="module-nav-box">
          <li class="sub-nav-content-item" v-for="navItem in menus" :key="navItem.id">
            <div class="sub-nav-title" @click="toggleOpenMenu(navItem)">
              <span style="display:inline-block;width:16px;">
                <i class="ivu-icon ivu-icon-md-arrow-dropright nav-arrow" :class="{'is-open':inOpen(navItem.name)}"></i>
              </span>
              <i class="ivu-icon nav-icon" :class="navItem.meta.icon"></i>
              <span>{{navItem.meta.title}}</span>
            </div>
            <ul class="module-nav-box" :class="inOpen(navItem.name) ? 'is-open' : 'is-close'" v-if="navItem.children && navItem.children.length">
              <li class="sub-nav-item" v-for="item in navItem.children" :key="item.id" @click="goToMenu(item)">
                <span class="text-title">{{item.meta.title}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import {oneOf,indexOfArray} from '@/libs/tools'
import CollapseTransition from './collapse-transition';
export default {
  components: { CollapseTransition },
  props:{
    menus:{
      type:Array,
      default:function(){
        return []
      }
    }
  },
  data(){
    return{
      publicPath: process.env.BASE_URL,
      openMenus:[],
      openTags:[],
      activeRouterName:''
    }
  },
  methods: {
    inOpen(name){
      return oneOf(name,this.openMenus)
    },
    handlerClickMenu(menu){
      if(menu.children && menu.children.length){
        this.toggleOpenMenu(menu);
      }else{
        this.goToMenu(menu);
      }
    },
    toggleOpenMenu(item){
      let name = item.name;
      let index = indexOfArray(name,this.openMenus);
      if(index>=0){
        this.openMenus.splice(index,1);
      }else{
        this.openMenus.push(name);
      }
    },
    goToMenu(item){
      if(this.activeRouterName == item.name) return;
      let index = this.findRouterIndexInTags(item);
      if(index < 0){
        this.openTags.push(item);
        this.activeRouterName = item.name;
        this.$router.push({
          name:item.name
        })
      }else{
        this.activeRouterName = item.name;
        this.$router.push({
          name:item.name
        })
      }
    },
    findRouterIndexInTags(item){
      for(let i = 0;i<this.openTags.length;i++){
        if(this.openTags[i].name == item.name){
          return i;
        }
      }
      return -1;
    }
  },
  mounted(){

  }
}
</script>
