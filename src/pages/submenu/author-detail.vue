<template>
    <div>
      <div class="title"><span  style="color: #2baee9" @click="$router.push('/worksManage')">作品管理</span><span class="space">&gt</span><span>作者信息</span></div>
      <div>
        <div class="bg"></div>
        <div class="img"><img src="../../assets/img/user_photo_100.png" alt="头像"></div>
        <div class="name"><span>{{nickName}}</span></div>
        <div class="number"><span>模板总数:{{worksCounts}}</span><span style="margin: 0 72px">模板使用量:{{worksUsedTimes}}</span><span>模板总收藏量:{{worksCollectTimes}}</span></div>
        <div id="box"><!-- style="padding-left: 35px"-->
            <!--<div class="card" v-for="item in list" v-if="item.ratio==0">
                <div>
                  <img class="mini_img" src="../../assets/img/desinger_bg2.png" alt="缩略图">
                </div>
                <span class="time">{{item.period}}</span>
                <div class="menuName">{{item.name}}</div>
                <div class="size">{{item.resolution}}</div>
            </div>
            <div class="cardBig" v-for="item in list" v-if="item.ratio==1">
              <div>
                <img class="big_img" src="../../assets/img/desinger_bg2.png" alt="缩略图">
              </div>
              <span class="time">{{item.period}}</span>
              <div class="menuName">{{item.name}}</div>
              <div class="size">{{item.resolution}}</div>
            </div>
            <Spin v-if="loadSwitch">
              <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
              <div>加载中...</div>
            </Spin>
            <div class="noData" v-if="lastSwitch">☺ 没有更多数据了！</div>-->
            <vueWaterfallEasy :imgsArr="list"
                              :maxCols="maxCols"
                              :gap="gap"
                              :imgWidth="imgWidth"
                              :height="height"
                              @scrollReachBottom="fetchImgsData"
                              ref="waterfall">
              <div slot-scope="props">
                <span class="time">{{props.value.period}}</span>
                <p class="menuName">{{props.value.name}}</p>
                <p class="size">{{props.value.resolution}}</p>
              </div>
              <div slot="waterfall-over">没有更多数据了</div>
            </vueWaterfallEasy>
        </div>
      </div>
    </div>
</template>

<script>
  import {fetchGet,fetchPost,fetchDelete} from '../../api/index';
  import vueWaterfallEasy from 'vue-waterfall-easy';
    export default {
      name: '',
      data () {
        return {
          id:'',
          list:[],
          lastSwitch:false,
          loadSwitch:false,
          newList:[],
          nickName:'',
          headImgUrl:'',
          worksCollectTimes:0,
          worksCounts:0,
          worksUsedTimes:0,
          start:0,
          imgsArr: [
            {
              src:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3915738658,2729894341&fm=27&gp=0.jpg',
              test:'ddddddddd'
            },
            {
              src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538236358324&di=cc26094fe125665fa754584b0ee40999&imgtype=0&src=http%3A%2F%2Fpic22.photophoto.cn%2F20120225%2F0034034432152602_b.jpg',
              test:'ddddddddd'
            },
            {
              src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538236358323&di=f61f497db78e3276c5225796a07207fc&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Dc3f6c60f16950a7b6138468463a907b5%2F730e0cf3d7ca7bcb85b85a16b5096b63f724a8cc.jpg',
              test:'ddddddddd'
            },
            {
              src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538236358321&di=5188f7b05f8eed79e41f0b2002e54542&imgtype=0&src=http%3A%2F%2Fpic27.photophoto.cn%2F20130402%2F0034034401816783_b.jpg',
              test:'ddddddddd'
            },
            {
              src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538236358321&di=b3e76a15f17ecd5885bc5b7a7688850e&imgtype=0&src=http%3A%2F%2Fpic21.photophoto.cn%2F20111106%2F0020032891433708_b.jpg',
              test:'ddddddddd'
            },
            {
              src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538236358321&di=00449c3f5a3fd9a5a5272ba8f83b0013&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Da6bd16e4fb1f3a294ec5dd8ef05dd95d%2F4034970a304e251fbf2353c2ac86c9177f3e5337.jpg',
              test:'ddddddddd'
            },
            {
              src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538236358321&di=b3e76a15f17ecd5885bc5b7a7688850e&imgtype=0&src=http%3A%2F%2Fpic21.photophoto.cn%2F20111106%2F0020032891433708_b.jpg',
              test:'ddddddddd'
            },
            {
              src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538236358321&di=00449c3f5a3fd9a5a5272ba8f83b0013&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Da6bd16e4fb1f3a294ec5dd8ef05dd95d%2F4034970a304e251fbf2353c2ac86c9177f3e5337.jpg',
              test:'ddddddddd'
            }
          ],
          fetchImgsArr: [],
          maxCols:4,
          gap:20,
          imgWidth:240,
          height:500
      }
    },
    components:{
        vueWaterfallEasy
    },
    methods:{
      fetchImgsData() {
        this.start=this.list.length;
        this.listData();
      },
      listData(){
        fetchGet({
          url:'backstage/works/author?length=20&start='+this.start+'&id='+this.$route.params.id,
          baseURL:'http://www.coo-share.com:8773/',
        }).then((res)=>{
          if(res.data.code==10000){
            this.nickName=res.data.obj.nickName;
            this.headImgUrl=res.data.obj.headImgUrl;
            this.worksCollectTimes=res.data.obj.worksCollectTimes;
            this.worksCounts=res.data.obj.worksCounts;
            this.worksUsedTimes=res.data.obj.worksUsedTimes;
            if(res.data.obj.worksList.length==0){
              this.$refs.waterfall.waterfallOver();
            };
            this.newList=this.list.concat(res.data.obj.worksList);
            this.list=this.newList

          }else{
            this.$Message.warning(res.data.msg);
          }
        })
      },
    },
    created(){
      this.listData();
    },
  }
</script>

<style scoped>
  .title{
    height: 40px;
    width: 100%;
    background-color: #fcfcfc;
    color: #7a7a7a;
    line-height: 40px;
    padding-left: 20px;
    border-bottom: 1px solid #e0e0e0;
    font-weight: bold;
    border-top-left-radius: 12px;
    border-top-right-radius:12px;
  }
  .space{
    margin: 6px;
  }
  .bg{
    width: 100%;
    height: 150px;
    background-image: url(../../assets/img/desinger_bg2.png);
  }
  .img{
    text-align: center;
    margin-top: -55px;
  }
  .name{
    font-size: 22px;
    font-weight: 600;
    text-align: center;
  }
  .number{
    text-align: center;
    margin: 21px 0 29px 0;
    font-size: 14px;
  }
  .card{
    position: relative;
    display: inline-block;
    width: 23%;
    height: 220px;
    margin: 0 16px 20px 0;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  .mini_img{
    width: 100%;
    height: 152px;
  }
  .cardBig{
    position: relative;
    display: inline-block;
    width: 23%;
    height: 415px;
    margin: 0 16px 20px 0;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
  .big_img{
    width: 100%;
    height: 350px;
  }
  .menuName{
    margin: 10px 0 4px 10px;
    font-weight: 700;
    color: #000;
  }
  .size{
    margin-left: 10px;
    color: #ccc;
  }
  .time{
    position: absolute;
    right: 16px;
    bottom: 70px;
    display: inline-block;
    background-color: #d0d3da8f;
    width: 60px;
    text-align: center;
    border-radius: 5px;
  }
  #box{
   /* border:1px solid #ccc;*/
    width: 100%;
    /*height: 500px;*/
    overflow: auto;
    background-color: #f7f7f7;
  }
  .noData{
    text-align: center;
    color: #666;
    margin-bottom: 6px;
  }
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
</style>
