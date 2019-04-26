<template>
  <div class="page-full-screen home-frame">
    <div class="full-absolute-top home-frame-top" style="left:232px;">
      <tags-nav :value="currentRouter" @input="handleClick" :list="openTags" @on-close="handleCloseTag"/>
    </div>
    <div class="full-absolute-left home-frame-left">
      <left-nav ref="sideMenu" :menus="menus" :active-name="$route.name" @on-select="turnToPage"></left-nav>
    </div>
    <div class="f-full-body home-frame-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import leftNav from '@/components/left-nav.vue'
import tagsNav from '@/components/tags-nav'
import { setTimeout } from 'timers';
export default {
  name: 'home',
  components:{
    leftNav,
    tagsNav
  },
  data(){
    return{
      currentRouter:{},
      openTags:[],
      menus:[]
    }
  },
  computed:{
    tagNavList () {
      return this.$store.state.tags.tagNavList
    }
  },
  created(){
    setTimeout(()=>{
      this.menus = [{
        id:'001',
        path:'cockpit',
        name:'cockpit',
        meta:{
          icon:'ivu-icon-md-boat',
          title:'管理驾驶舱'
        },
        children:[{
          id:'0011',
          path:'provinceComplex',
          name:'provinceComplex',
          meta:{
            icon:'ivu-icon-md-boat',
            title:'全省服务区运营综合'
          }
        },{
          id:'0012',
          path:'districtChiefRoom',
          name:'districtChiefRoom',
          meta:{
            icon:'ivu-icon-md-boat',
            title:'服务区区长驾驶室'
          }
        },{
          id:'0013',
          path:'peopleFlow',
          name:'peopleFlow',
          meta:{
            icon:'ivu-icon-md-boat',
            title:'服务区人流拥挤热力'
          }
        },{
          id:'0014',
          path:'trafficFlow',
          name:'trafficFlow',
          meta:{
            icon:'ivu-icon-md-boat',
            title:'服务区车流看板'
          }
        }]
      },{
        id:'002',
        path:'dataMining',
        name:'dataMining',
        meta:{
          icon:'ivu-icon-md-boat',
          title:'数据挖掘'
        },
        children:[{
          id:'0021',
          path:'calcParking',
          name:'calcParking',
          meta:{
            icon:'ivu-icon-md-boat',
            title:'车位预测'
          }
        },{
          id:'0022',
          path:'calcPeople',
          name:'calcPeople',
          meta:{
            icon:'ivu-icon-md-boat',
            title:'人流预测'
          }
        },{
          id:'0023',
          path:'calcManage',
          name:'calcManage',
          meta:{
            icon:'ivu-icon-md-boat',
            title:'经营预测'
          }
        }]
      }];
      this.getFirstMenu();
    },300);
  },
  methods:{
    ...mapMutations([
      'setTagNavList',
      'addTag',
      'setLocal',
      'closeTag'
    ]),
    getFirstMenu(){
      let menu = this.menus[0];
      let currentRouter;
      if(!menu.children || (menu.children && menu.children.length == 0)){
        currentRouter = menu;
      }else{
        currentRouter = menu.children[0];
      };
    },
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCloseTag (res, type, route) {
      if (type !== 'others') {
        if (type === 'all') {
          this.turnToPage(this.$config.homeName)
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTag(route)
          }
        }
      }
      this.setTagNavList(res)
    },
    handleClick (item) {
      this.turnToPage(item)
    }
  },
  watch: {
    '$route' (newRoute) {
      this.$refs.sideMenu.updateOpenName(newRoute.name)
    }
  },
}
</script>
