<template>
  <div>
    <title-page :title="title"></title-page>
    <div>
      <div class="addBtn">
        <Button type="primary"  @click.native="addSwitchBtn">新增机构</Button>
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
              <FormItem label="机构类型:">
                <Select v-model="formLeft.insType" clearable>
                  <Option value="0">普通机构</Option>
                  <Option value="1">一般机构</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="5" offset="1">
              <FormItem label="审核状态:">
                <Select v-model="formLeft.state" clearable>
                  <Option value="0">待审核</Option>
                  <Option value="1">审核不通过</Option>
                  <Option value="2">审核通过</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="2" style="margin-left: 10px">
              <Button type="primary" @click="initSearch">查询</Button>
            </Col>
          </Row>
        </Form>
        <div>
          <Table stripe border  :columns="columns" :data="data1" height="522"></Table>
        </div>
        <div class="pages">
          <Page :total="total"
                show-sizer
                @on-change="pageChange"
                @on-page-size-change="pageSizeChange"/>
        </div>
      </div>
    </div>
    <Modal
      v-model="addSwitch"
      title="新增机构"  width="500px" :mask-closable="false">
      <Form :model="addMechanism" ref="addMechanism" label-position="right" :rules="ruleValidate" :label-width="110">
        <FormItem label="机构名称：" prop="name">
          <Input v-model="addMechanism.name"></Input>
        </FormItem>
        <FormItem label="机构电话：" prop="cellphoneNumber">
          <Input v-model="addMechanism.cellphoneNumber"></Input>
        </FormItem>
        <FormItem label="机构邮箱：" prop="mailboxAccount">
          <Input v-model="addMechanism.mailboxAccount"></Input>
        </FormItem>
        <FormItem label="机构管理员："  prop="administrator">
          <Input v-model="addMechanism.administrator" icon="arrow-down-b" disabled  @on-click="search"></Input>
          <div  class="tfbox" v-if="searchListSwitch">
            <div>
              <Input v-model="keywords" placeholder="请输入您想搜索的账户名或手机号" icon="search" @on-click="searchIcon"></Input>
            </div>
            <div class="addMan" v-if="!addManSwitch" @click="addManSwitch=!addManSwitch">新建机构管理员</div>
            <div v-if="addManSwitch">
              <Input v-model="cellphoneNumber" placeholder="请输入您的手机号" style="margin: 16px 0 5px 0"></Input>
              <Input v-model="password" placeholder="请输入您的密码"></Input>
              <div>
                <span class="sumBtn" @click="sureBtn">确认</span>
                <span @click="addManSwitch=!addManSwitch" style="color: red">取消</span>
              </div>
            </div>
            <!--滚动-->
            <div class="listbox" id="scrollBox">
              <div  v-for="(item,index) in manageList" class="oneList" @click="selectOne(item,$event)">
                <span class="accname">{{item.accountName}}</span>
                <span class="cellnum">{{item.cellphoneNumber}}</span>
              </div>
              <div v-if="lastSwitch" class="nodate">没有更多数据了</div>
            </div>
          </div>
        </FormItem>
        <FormItem label="机构类型：">
          <Radio v-model="addMechanism.type_">普通机构</Radio>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="addSwitch=false">取消</Button>
        <Button type="primary" @click="addOk('addMechanism')">新增</Button>
      </div>
    </Modal>
    <Modal
      v-model="detailSwitch"
      title="机构详情"  width="360px" :mask-closable="false">
      <Form   label-position="right" :label-width="120">
        <FormItem label="机构名称：">
          {{detail.name}}
        </FormItem>
        <FormItem label="机构电话：">
          {{detail.cellphoneNumber}}
        </FormItem>
        <FormItem label="机构邮箱：">
          {{detail.mailboxAccount}}
        </FormItem>
        <FormItem label="申请人：">
          {{detail.submitter}}
        </FormItem>
        <FormItem label="机构类型：">
          {{detail.insType | mecType}}
        </FormItem>
        <FormItem label="审核失败原因：" v-show="failAnswer">
          {{detail.insType | mecType}}
        </FormItem>
      </Form>
      <div slot="footer" v-show="examineSwitch">
        <Button type="error" @click="examine(1)">审核不通过</Button>
        <Button type="success" @click="examine(2)">审核通过</Button>
      </div>
    </Modal>
    <Modal v-model="delSwitch" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>确认要删除该机构吗？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="modal_loading" @click="del">确认删除</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import titlePage from '../components/title-page.vue';
  import {fetchGet,fetchPost,fetchDelete,fetchPatch} from '../api/index';
  import {getStore} from '../utils/utils.js';
  import {verify} from '../utils/verify';
  import {keyHighLight,eachTextHighLight} from '../utils/keyFunction';
export default {
  data () {
    return {
      title:'机构管理',
      pageSize:10,
      pageNumber:1,
      addSwitch:false,
      addManSwitch:false,
      detailSwitch:false,
      delSwitch:false,
      modal_loading: false,
      examineSwitch:false,
      lastSwitch:false,
      searchListSwitch:true,
      failAnswer:false,
      keywords:'',
      keyword:'',
      start:0,
      total:0,
      id:'',
      status_:'',
      administrator:'',
      cellphoneNumber:'',
      password:'',
      value17:'',
      manageList:[],
      newList:[],
      formLeft: {
        id: '',
        insName: '',
        type_: '',
        state: '',
      },
      addMechanism:{
        administrator:'',
        cellphoneNumber:'',
        mailboxAccount:'',
        type_:true,
        name:'',
        administratorID:'',
      },
      detail:{
        name:'',
        cellphoneNumber:'',
        mailboxAccount:'',
        type_:'',
        submitter:'',
      },
      ruleValidate: {
        name: [
          { required: true, type: 'string', message: '请输入机构名称', trigger: 'blur' }
        ],
        administrator: [
          { required: true, type: 'string', message: '请输入机构管理员', /*trigger: 'change'*/ }
        ],
        cellphoneNumber: [
          { required: true, validator:verify.mobilephone, trigger: 'blur' }
        ],
        mailboxAccount: [
          { required: false, validator:verify.regMail, trigger: 'blur' }
        ],
      },
      columns: [
        {
          title: '机构ID',
          key: 'id',
          align: 'center',
          //width: 320
          render: (h, params) => {
            return eachTextHighLight(h, params,this.keyword);
          }
        },
        {
          title: '机构名称',
          key: 'name',
          align: 'center',
          render: (h, params) => {
            return eachTextHighLight(h, params,this.keyword);
          }
        },
        {
          title: '机构电话',
          key: 'cellphoneNumber',
          align: 'center',
          render: (h, params) => {
            return eachTextHighLight(h, params,this.keyword);
          }
        },
        {
          title: '机构邮箱',
          key: 'mailboxAccount',
          align: 'center',
          render: (h, params) => {
            return eachTextHighLight(h, params,this.keyword);
          }
        },
        {
          title: '机构类型',
          key: 'insType',
          align: 'center',
          render:(h,params)=>{
            if(params.row.insType===0){
              return h('div',"普通机构")
            }else{
              return h('div',"一般机构")
            }
          }
        },
        {
          title: '状态',
          key: 'status_',
          align: 'center',
          render: (h, params) => {
            if(params.row.status_ === 2){
              return h('div', [
                h('Span', {
                  style: {
                    color: '#11cd34',
                    fontSize:'12px',
                  },
                },"审核通过"),
              ]);
            }else if(params.row.status_ === 0){
              return h('div', [
                h('Span', {
                  style: {
                    color: '#ffc002',
                    fontSize:'12px',
                  },
                },"审核中"),
              ]);
            }else{
              return h('div', [
                h('Span', {
                  style: {
                    color: '#ea2814',
                    fontSize:'12px',
                  },
                },"审核不通过"),
              ]);
            }

          }
        },
        {
          title: '操作',
         // key: 'action',
          //fixed: 'right',
          align: 'center',
          width: 120,
          render: (h, params) => {
            return h('div', [
              /*h('Icon', {
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
                    this.examine();
                  }
                }
              }),*/
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
                      this.detailMech(params);
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
                    this.delBtn(params.row.id);
                  }
                }
              }),
            ]);
          }
        }
      ],
      data1: [],
    }

  },
  components:{
    titlePage
  },
  created(){
    this.listData();
    this.search();
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll,true);  // 监听（绑定）滚轮滚动事件
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  filters: {
    mecType: function (value) {
      if(value==0){
        return '普通机构'
      }else{
        return '一般机构'
      }
    }
  },
  methods:{
    handleScroll() {
      let scrollObj = document.getElementById('scrollBox'); // 滚动区域
      if(!!scrollObj.scrollTop){
        var scrollTop = scrollObj.scrollTop ;
      } // 到头部的距离
      let scrollHeight = scrollObj.scrollHeight; // 滚动条的总高度
      if(scrollTop+100 == scrollHeight){
        this.start=this.manageList.length;
        this.searchCommon();
      }
    },
    searchCommon(){
      let key;
      if(!!this.keywords){
        key='backstage/platform/platform/account?length=10&start='+this.start+'&keyword='+this.keywords;
      }else{
        key='backstage/platform/platform/account?length=10&start='+this.start;
      }
      if(!!this.searchListSwitch){
        fetchGet({
          url:key,
          baseURL:'http://www.coo-share.com:8769/',
        }).then((res)=>{
          console.log(res,'xxxxxxxxxxxxxxxxxxxxx');
          if(res.data.code==10000){
            if(res.data.obj.length==0){
              this.lastSwitch=true;
            };
            if(this.manageList.length==0){
              this.manageList=res.data.obj;
            }else{
              this.newList=this.manageList.concat(res.data.obj);
              this.manageList=this.newList
            }
          }else{
            this.$Message.warning(res.data.msg);
          }
        })
      }
    },
    search(){//点击下拉
      this.searchListSwitch=!this.searchListSwitch;
      this.start=0;
      this.searchCommon();

    },
    searchIcon(){//点击搜索
      this.start=0;
      this.manageList=[];
      this.searchCommon();
    },
    sureBtn(){
      if(this.cellphoneNumber&&this.password){
        fetchPost({
          url:'backstage/platform/account',
          baseURL:'http://www.coo-share.com:8769/',
          params:{
            cellphoneNumber:this.cellphoneNumber,
            password:this.password,
          }
        }).then((res)=>{
          if(res.data.code==10000){
            this.manageList=[];
            this.start=0;
            this.searchCommon();
          }else{
            this.$Message.warning(res.data.msg);
          }
        })
      }else{
        this.$Message.error('请同时输入手机号与密码才能添加！');
      }

    },
    selectOne(item,e){
      console.log(item,e,'item,e');
      this.addMechanism.administrator=item.accountName;
      this.addMechanism.administratorID=item.accountId;
    },
    pageChange(num){//!!this.formLeft.insName||!!this.formLeft.insType||!!this.formLeft.state||!!this.formLeft.id
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
    addOk(name){
      this.$refs[name].validate((valid) =>{
        if(valid){
          fetchPost({
            url:'backstage/institution',
            baseURL:'http://www.coo-share.com:8765/',
            params:{
              administrator:this.addMechanism.administratorID,
              cellphoneNumber:this.addMechanism.cellphoneNumber,
              mailboxAccount:this.addMechanism.mailboxAccount,
              name:this.addMechanism.name,
              //type_:10000,
            },
          }).then((res)=>{
            if(res.data.code==10000){
              this.addSwitch=false;
              this.pageNumber=1;
              this.listData();
            }else{
              this.$Message.warning(res.data.msg);
            }

          })
        }else{
          this.$Message.error('请输入必填信息！');
        }
      })
    },
    examine(num){
      fetchPatch({
        url:'backstage/institution',
        baseURL:'http://www.coo-share.com:8765/',
        params:{
          id:this.id,
          status_:num,//2，代表审核通过，1代表不通过。
        }
      }).then((res)=>{
        this.detailSwitch=false;
        if(res.data.code==10000){
          this.$Message.success('审核通过！！');
          this.listData();
        }else{
          this.$Message.warning(res.data.msg);
        }
      })
    },
    addSwitchBtn(){
      this.addMechanism.administrator='';
      this.addMechanism.cellphoneNumber='';
      this.addMechanism.mailboxAccount='';
      this.addMechanism.type_=true;
      this.addMechanism.name='';
      this.addMechanism.administratorID='';
      this.searchListSwitch=false;
      this.addSwitch=true;

    },
    detailMech(params){
      this.detailSwitch=true;
      if(params.row.status_==0){//审核中
        this.examineSwitch=true;
        this.failAnswer=false;
      }else if(params.row.status_==2){//审核通过
        this.examineSwitch=false;
        this.failAnswer=false;
      }else{
        this.examineSwitch=false;
        this.failAnswer=true;
      };
      this.id=params.row.id;
      this.status_=params.row.status_;
      this.detail.name=params.row.name;
      this.detail.cellphoneNumber=params.row.cellphoneNumber;
      this.detail.mailboxAccount=params.row.mailboxAccount;
      this.detail.type_=params.row.insType;
      this.detail.submitter=params.row.submitter;
    },
    delBtn(id){
      this.delSwitch=true;
      this.id=id;
      console.log(id,'ididdid');
    },
    del () {
      this.modal_loading = true;
      fetchDelete({
        url:'ins/id',
        params:{
          id:this.id
        }
      }).then((res)=>{
        console.log(res,'vvvvvv-');
      })
    },
    searchList(){
      fetchGet({
        url:'backstage/institution?sortOrder=desc&pageSize='+this.pageSize+'&pageNumber='+this.pageNumber+'&keyword='+this.keyword,
        baseURL:'http://10.0.0.192:8765/',
      }).then((res)=>{
        console.log(res,'searchlist-');
        if(res.data.code==10000){/*.data.code==10000*/
          this.data1=res.data.obj.rows;
          this.total=res.data.obj.total;
        }else{
          this.data1=[];
          this.total=0;
          this.$Message.warning(res.data.msg);
        }
      })
    },
    listData(){
      fetchGet({
        url:'backstage/institution?sortOrder=desc&pageSize='+this.pageSize+'&pageNumber='+this.pageNumber,
        baseURL:'http://10.0.0.192:8765/',
      }).then((res)=>{
          if(res.data.code==10000){
            this.data1=res.data.obj.rows;
            this.total=res.data.obj.total;
          }else{
            this.data1=[];
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
  .addMan{
    color: #2d8cf0;
  }
  .listbox{
    height: 100px;
    overflow: auto;
    border: 1px solid #ccc;
  }
  .tfbox{
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .nodate{
    text-align: center;
    font-size: 14px;
    color: #ccc;
  }
  .oneList:hover{
    background-color: #2d8cf0b3;
    color: #fff;
  }
  .sumBtn{
    margin: 0 20px 0 10px;
    color: #2d8cf0;
  }
  .accname{
    display: inline-block;
    width: 100px;
    margin-left: 10px;
  }
</style>
