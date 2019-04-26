<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import '@/assets/app.scss'
export default {

}
</script>
<style lang="scss">
#app {
  font-family: '微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 大于1920px */
@media screen and (min-width:1920px){

}

@media screen and (max-width:1920px){
  .login-page{
    padding-right: 75px;
  }
}

@media screen and (max-width:1919px) and (min-width:1660px){
  .login-page{
    padding-right: 40px;
  }
}

@media screen and (max-width:1559px) and (min-width:1400px){
  .login-page{
    padding-right: 0px;
  }
}



/*重置ivu样式*/
.ivu-modal-content{
  border-radius: 0 !important;
}
.ivu-table-border .ivu-table-tip td{
  border-right:0;
}

.ivu-modal-body .ivu-form-item:last-child{
  margin-bottom:6px;
}

.table-default td .ivu-picker-panel-body{
  font-size:12px;
}

.ivu-table-wrapper .ivu-table-cell{
  padding-left:12px;
  padding-right:12px;
}

/* 重置按钮hover */
.ivu-btn-success:hover{
  background-color: #49bc62 !important;
  border-color: #49bc62 !important;
}

.ivu-btn-error:hover{
  background-color: #dd5656 !important;
  border-color: #dd5656 !important;
}
.ivu-btn-warning:hover{
  background-color: #ee920e !important;
  border-color: #ee920e !important;
}

.ivu-btn-info:hover{
  background-color: #29a9da !important;
  border-color: #29a9da !important;
}

.ivu-btn-primary:hover{
  background-color:#268bdc !important;
  border-color:#268bdc !important;  
}

.ivu-btn-success[disabled]:hover,
.ivu-btn-error[disabled]:hover,
.ivu-btn-warning[disabled]:hover,
.ivu-btn-info[disabled]:hover,
.ivu-btn-primary[disabled]:hover{
  color: #c5c8ce !important;
  background-color: #f7f7f7 !important;
  border-color: #dcdee2 !important;
}

/* 搜索按钮 */
button.search-btn{
  font-size: 18px;
}

.search-btn{
  padding: 3px 15px 3px 15px !important;
}

/* 针对4月3号修改对话框字体需求 */
.ChangeFont {
  .ivu-modal-header .ivu-modal-header-inner{
    font-size: 18px;
  }
  .select-liest-wrap .select-list-item{
    font-size: 16px;
  }
  .ivu-btn-large{
    font-size: 18px;
    padding: 2px 15px 2px 15px;
  }
  .ivu-modal-footer button + button{
    margin-left: 16px;
  }

}


/* 斑马条纹改色 */
.ivu-table-stripe .ivu-table-body tr:nth-child(2n) td,
.ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
  background-color: #f4f8fb !important;
}
.ivu-table-stripe .ivu-table-body  tr.ivu-table-row-hover td{
  background-color: #ebf7ff !important;
}
/* 表格选中行高亮 */
.ivu-table-row-highlight td,
tr.ivu-table-row-highlight.ivu-table-row-hover td, 
.ivu-table-stripe .ivu-table-body tr.ivu-table-row-highlight:nth-child(2n) td,
.ivu-table-stripe .ivu-table-fixed-body tr.ivu-table-row-highlight:nth-child(2n) td{
  background-color: #ebf7ff !important;
  font-weight: bold;
}
/* 表头加粗 */
table.bold-table-header thead th{
  font-weight: bold;
}
/* 4.18模态框底部按钮改小两个px */
.ivu-modal{
  .ivu-modal-footer{
    button.ivu-btn{
      font-size: 16px;
    }
  }
}



</style>
