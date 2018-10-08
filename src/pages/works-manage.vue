<template>
  <div>
    <title-page :title="title"></title-page>
    <div>
      <div class="addBtn">
        <Button type="primary" @click.native="$router.push('/workChartShow')">图表展示</Button>
      </div>
      <div>
        <Form :model="formLeft"  :label-width="74">
          <Row>
            <Col span="5">
              <FormItem label="关键字:">
                <Input v-model="keyword" placeholder="请输入您想搜索的关键字"></Input>
              </FormItem>
            </Col>
            <Col span="5" offset="1">
              <FormItem label="行业:">
                <Select v-model="formLeft.trade" clearable>
                  <Option value="0">不限</Option>
                  <Option value="1">餐饮</Option>
                  <Option value="2">房地产</Option>
                  <Option value="3">教育</Option>
                  <Option value="4">前台教育</Option>
                  <Option value="5">酒店</Option>
                  <Option value="6">金融</Option>
                  <Option value="7">旅游</Option>
                  <Option value="8">商城</Option>
                  <Option value="9">医疗</Option>
                  <Option value="10">影视文化</Option>
                  <Option value="11">交通工具</Option>
                  <Option value="12">互联网</Option>
                  <Option value="13">环保</Option>
                  <Option value="14">招聘</Option>
                  <Option value="15">其他</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="5">
              <FormItem label="尺寸:">
                <Select v-model="formLeft.ratio" clearable>
                  <Option value="0">不限</Option>
                  <Option value="1">横16:9</Option>
                  <Option value="2">竖9:16</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="5" offset="1">
              <FormItem label="节日:">
                <Select v-model="formLeft.festival" clearable>
                  <Option value="0">不限</Option>
                  <Option value="1">元旦</Option>
                  <Option value="2">情人节</Option>
                  <Option value="3">春节</Option>
                  <Option value="4">元宵</Option>
                  <Option value="5">复活节</Option>
                  <Option value="6">三八妇女节</Option>
                  <Option value="7">愚人节</Option>
                  <Option value="8">清明节</Option>
                  <Option value="9">端午节</Option>
                  <Option value="10">劳动节</Option>
                  <Option value="11">五四青年节</Option>
                  <Option value="12">六一儿童节</Option>
                  <Option value="13">母亲节</Option>
                  <Option value="14">父亲节</Option>
                  <Option value="15">七夕</Option>
                  <Option value="16">重阳节</Option>
                  <Option value="17">教师节</Option>
                  <Option value="18">中秋节</Option>
                  <Option value="19">国庆节</Option>
                  <Option value="20">双十一</Option>
                  <Option value="21">万圣节</Option>
                  <Option value="22">感恩节</Option>
                  <Option value="23">双十二</Option>
                  <Option value="24">圣诞节</Option>
                  <Option value="25">其他</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="2" offset="1">
              <Button type="primary" @click.native="initSearch">查询</Button>
            </Col>
          </Row>
        </Form>
        <div>
          <Table stripe border  :columns="columns" :data="data" height="522"></Table>
        </div>
        <div class="pages">
          <Page :total="total"
                show-sizer
                @on-change="pageChange"
                @on-page-size-change="pageSizeChange"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import titlePage from '../components/title-page.vue';
  import {fetchGet,fetchPost,fetchDelete} from '../api/index';
  import {keyHighLight,eachTextHighLight} from '../utils/keyFunction';
  export default {
    data () {
      return {
        title:'作品管理',
        total:0,
        pageSize:10,
        pageNumber:1,
        keyword:'',
        formLeft: {
          worksId: '',
          name: '',
          trade	: '',
          festival: '',
          ratio: '',
        },
        columns: [
          {
            title: '作品ID',
            key: 'id',
            align: 'center',
            //width: 320
            render: (h, params) => {
              return eachTextHighLight(h, params,this.keyword);
            }
          },
          {
            title: '作品名称',
            key: 'name',
            align: 'center',
            width: 120,
            render: (h, params) => {
              return eachTextHighLight(h, params,this.keyword);
            }
          },
          {
            title: '尺寸',//
            key: 'ratio',
            align: 'center',
            render: (h, params) => {
               return eachTextHighLight(h, params,this.keyword);
            }
          },
          {
            title: '播放时长',
            key: 'period',
            align: 'center',
            width: 90,
            render: (h, params) => {
              return eachTextHighLight(h, params,this.keyword);
            }
          },
          {
            title: '作者',
            key: 'author',
            align: 'center',
            width:130,
            render: (h, params) => {
                return h('div', [
                  h('Span', {
                    style: {
                      color: '#5e5dcd',
                      fontSize:'12px',
                      textDecoration:'underline'
                    },
                    on: {
                      click: () => {
                        this.toDetail(params);
                        console.log('tiaozhuan');
                      }
                    }
                  },params.row.author),
                ]);
            }
          },
          {
            title: '行业',
            key: 'trade',
            align: 'center',
            render:(h,params)=>{
              if(params.row.trade==0){
                return h('div',"不限")
              }else if(params.row.trade==1){
                return h('div',"餐饮")
              }else if(params.row.trade==2){
                return h('div',"房地产")
              }else if(params.row.trade==3){
                return h('div',"教育")
              }else if(params.row.trade==4){
                return h('div',"前台教育")
              }else if(params.row.trade==5){
                return h('div',"酒店")
              }else if(params.row.trade==6){
                return h('div',"金融")
              }else if(params.row.trade==7){
                return h('div',"旅游")
              }else if(params.row.trade==8){
                return h('div',"商场")
              }else if(params.row.trade==9){
                return h('div',"医疗")
              }else if(params.row.trade==10){
                return h('div',"影视文化")
              }else if(params.row.trade==11){
                return h('div',"交通工具")
              }else if(params.row.trade==12){
                return h('div',"互联网")
              }else if(params.row.trade==13){
                return h('div',"环保")
              }else if(params.row.trade==14){
                return h('div',"招聘")
              }else{
                return h('div',"其他")
              }
            }
          },
          {
            title: '节日',
            key: 'festival',
            align: 'center',
            width: 110,
            render:(h,params)=>{
              if(params.row.festival==0){
                return h('div',"不限")
              }else if(params.row.festival==1){
                return h('div',"元旦")
              }else if(params.row.festival==2){
                return h('div',"情人节")
              }else if(params.row.festival==3){
                return h('div',"春节")
              }else if(params.row.festival==4){
                return h('div',"元宵")
              }else if(params.row.festival==5){
                return h('div',"复活节")
              }else if(params.row.festival==6){
                return h('div',"三八妇女节")
              }else if(params.row.festival==7){
                return h('div',"愚人节")
              }else if(params.row.festival==8){
                return h('div',"清明节")
              }else if(params.row.festival==9){
                return h('div',"端午节")
              }else if(params.row.festival==10){
                return h('div',"劳动节")
              }else if(params.row.festival==11){
                return h('div',"五四青年节")
              }else if(params.row.festival==12){
                return h('div',"六一儿童节")
              }else if(params.row.festival==13){
                return h('div',"母亲节")
              }else if(params.row.festival==14){
                return h('div',"父亲节")
              }else if(params.row.festival==15){
                return h('div',"七夕")
              }else if(params.row.festival==16){
                return h('div',"重阳节")
              }else if(params.row.festival==17){
                return h('div',"教师节")
              }else if(params.row.festival==18){
                return h('div',"中秋节")
              }else if(params.row.festival==19){
                return h('div',"国庆节")
              }else if(params.row.festival==20){
                return h('div',"双十一")
              }else if(params.row.festival==21){
                return h('div',"万圣节")
              }else if(params.row.festival==22){
                return h('div',"感恩节")
              }else if(params.row.festival==23){
                return h('div',"双十二")
              }else if(params.row.festival==24){
                return h('div',"圣诞节")
              }else{
                return h('div',"其他")
              }
            }
          },
          {
            title: '下载量',
            key: 'usedTimes',
            align: 'center',
            render: (h, params) => {
              return eachTextHighLight(h, params,this.keyword);
            }
          },
          {
            title: '收藏量',
            key: 'collectTimes',
            align: 'center',
            render: (h, params) => {
              return eachTextHighLight(h, params,this.keyword);
            }
          },
          {
            title: '价格',
            key: 'price',
            align: 'center',
            render: (h, params) => {
              return eachTextHighLight(h, params,this.keyword);
            }
          },
          {
            title: '状态',
            key: 'status_',
            align: 'center',
          },
          {
            title: '操作',
            // key: 'action',
            //fixed: 'right',
            align: 'center',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'ios-navigate',
                    color:'#2d8cf0',
                  },
                  style: {
                    marginRight: '15px',
                    fontSize:'20px'
                  },
                  on: {
                    click: () => {
                      // this.examine();
                    }
                  }
                }),
                h('Icon', {
                  props: {
                    type: 'ios-information',
                    color:'#2d8cf0'
                  },
                  style: {
                    marginRight: '15px',
                    fontSize:'20px'
                  },
                  on: {
                    click: () => {
                      // this.detailMech(params);
                    }
                  }
                }),
                h('Icon', {
                  props: {
                    type: 'trash-a',
                    color:'#2d8cf0'
                  },
                  style: {
                    fontSize:'20px'
                  },
                  on: {
                    click: () => {
                      // this.delBtn(params.row.id);
                    }
                  }
                }),
              ]);
            }
          }
        ],
        data: []
      }

    },
    components:{
      titlePage
    },
    created(){
      this.listData();
    },
    methods:{
      toDetail(params){
        this.$router.push({
          name: 'authorDetail',
          params: {
            id: params.row.authorId,
            /*author: params.row.author,
            usedTimes: params.row.usedTimes,
            collectTimes: params.row.collectTimes,
            id: params.row.authorId,*/
          }
        })
      },
      pageChange(num){//!!this.formLeft.worksId||!!this.formLeft.name||!!this.formLeft.trade||!!this.formLeft.festival||!!this.formLeft.ratio
        console.log(num,'pageChange');
        this.pageNumber=num;
        if(!!this.keyword){
          this.searchList();
        }else{
          this.listData();
        }
      },
      pageSizeChange(num){
        console.log(num,'pageSizeChange');
        this.pageSize=num;
        if(!!this.keyword){
          this.searchList();
        }else{
          this.listData();
        }
      },
      listData(){
        fetchGet({
          url:'backstage/works?sortOrder=desc&pageSize='+this.pageSize+'&pageNumber='+this.pageNumber,
          baseURL:'http://www.coo-share.com:8773/',
        }).then((res)=>{
          console.log(res,'list1----');
          if(res.data.code==10000){
            this.data=res.data.obj.rows;
            this.total=res.data.obj.total;
          }else{
            this.data=[];
            this.total=0;
            this.$Message.warning(res.data.msg);
          }
        })
      },
      searchList(){
        fetchGet({
          url:'backstage/works?sortOrder=desc&pageSize='+this.pageSize+'&pageNumber='+this.pageNumber+'&keyword='+this.keyword,
          baseURL:'http://www.coo-share.com:8773/',
        }).then((res)=>{
          console.log(res,'list2----');
          if(res.data.code==10000){
            this.data=res.data.obj.rows;
            this.total=res.data.obj.total;
          }else{
            this.data=[];
            this.total=0;
            this.$Message.warning(res.data.msg);
          }
        })
      },
      initSearch(){
        this.pageNumber=1;
        this.searchList();
      },
    }
  }
</script>
<style scoped>
  .addBtn{
    margin-top: 14px;
    margin-left: 18px;
    margin-bottom: 14px;
  }
  .pages{
    margin-top: 8px;
    margin-left: 18px;
  }
</style>
