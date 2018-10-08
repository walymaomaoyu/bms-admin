<template>
  <div class="all">
    <div class="head">
      <span class="img"><img src="../../assets/img/logo_index.png" alt=""></span>
      <div class="nav">
        <Menu mode="horizontal" ref="menu" :theme="theme1" :active-name="pages" @on-select="navigateTo">
          <MenuItem name="1" v-if="accountRole==0||accountRole==1">
            <Icon type="android-share-alt"></Icon>
            机构管理
          </MenuItem>
          <Submenu name="2" v-if="accountRole==0||accountRole==2">
            <template slot="title">
              <Icon type="ios-albums"></Icon>
              内容管理
            </template>
            <MenuItem name="2-1">作品管理</MenuItem>
            <!--<MenuItem name="2-2">素材管理</MenuItem>-->
          </Submenu>
          <Submenu name="3" v-if="accountRole==0||accountRole==3">
            <template slot="title">
              <Icon type="ios-people" />
              账户管理
            </template>
            <MenuItem name="3-1">账户管理</MenuItem>
            <MenuItem name="3-2">用户管理</MenuItem>
          </Submenu>
          <MenuItem name="4" v-if="accountRole==0||accountRole==4">
            <Icon type="android-desktop"></Icon>
            设备管理
          </MenuItem>
          <Submenu name="5" v-if="accountRole==0||accountRole==5">
            <template slot="title">
              <Icon type="social-windows"></Icon>
              系统管理
            </template>
            <MenuItem name="5-1">常见问题</MenuItem>
            <MenuItem name="5-2">版本管理</MenuItem>
          </Submenu>
          <Submenu name="6">
            <template slot="title">
              <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="small"/>
              {{accountName}}
            </template>
            <MenuItem name="6-1">{{roleName}}</MenuItem>
            <MenuItem name="6-2" @click.native="exit">退出</MenuItem>
          </Submenu>
        </Menu>
      </div>
    </div>
    <div class="main">
      <transition>
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
  import {removeStore} from '../../utils/utils';
  import {fetchGet,fetchDelete} from '../../api/index';
    export default {
        data(){
          return{
            theme1: 'light',
            pages:'1',
            open:[],
            roleName:'',
            accountRole:'',
            accountName:'',
          }
        },
        mounted(){
          console.log('tftfttf');
          this.init();
          this.pages=this.$route.name;
          this.$nextTick(()=>{
            this.$refs.menu.updateActiveName();
          })
        },
       methods:{
         exit(){
           fetchDelete({
             url:'backstage/session',
             baseURL:'http://www.coo-share.com:8769/',
           }).then((res)=>{
             console.log(res);
             if(res.data.code==10000){
                removeStore('user');
                this.$router.push('/login');
             }else{
               this.$Message.warning(res.data.msg);
             }
           })

         },
         navigateTo(name){
           this.$router.push({name:name});
         },
         init(){
           fetchGet({
             url:'backstage/account',
             baseURL:'http://www.coo-share.com:8769/',
           }).then((res)=>{
             console.log(res,'account----');
             if(res.data.code==10000){
               this.accountName=res.data.obj.accountName;
               this.accountRole=res.data.obj.accountRole;
               this.roleName=res.data.obj.roleName;
             }else{
               this.accountName='';
               this.accountRole='';
               this.roleName='';
               this.$Message.warning(res.data.msg);
             }
           })
         },
       }
    }
</script>

<style scoped>
  .all{
    height: 100%;
    overflow: hidden;
  }
.head{
  width: 100%;
  height: 69px;
  background-color: #fff;
  position: relative;
}
  .img{
    display: inline-block;
    line-height: 69px;
    position: absolute;
    top: 10px;
    left: 10%;
  }
  .nav{
    display: inline-block;
    position: absolute;
    right: 10%;
  }
  .main{
    width: 1200px;
    margin:12px auto;
    height:100%;
    display: block;
    background-color: #fff;
    border-radius: 12px;
    border: 1px solid #e0e0e0;
  }
</style>
