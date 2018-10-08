<template>
  <div>
    <title-page :title="title"></title-page>
    <div>
      <div class="addBtn">
        <Button type="primary"  @click.native="addswitchBtn">新增账户</Button>
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
              <FormItem label="账户角色:">
                <Select v-model="formLeft.role" clearable>
                  <Option v-for="(item,index) in listRole" :value="item.roleId" :key="index">{{item.roleName}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="2" style="margin-left: 10px">
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
    <Modal
      v-model="addswitch"
      title="新增账户"  width="500px" :mask-closable="false">
      <Form :model="addMechanism" ref="addMechanism" label-position="right" :rules="ruleValidate" :label-width="80">
        <FormItem label="账户名：" prop="accountName">
          <Input v-model="addMechanism.accountName" style="width: 376px"></Input>
        </FormItem>
        <FormItem label="密码：" prop="password">
          <Input v-model="addMechanism.password" style="width: 376px"></Input>
        </FormItem>
        <FormItem label="手机号：" prop="cellphoneNumber">
          <Input v-model="addMechanism.cellphoneNumber" style="width: 376px"></Input>
        </FormItem>
        <FormItem label="邮箱：" prop="mailboxAccount">
          <Input v-model="addMechanism.mailboxAccount" style="width: 376px"></Input>
        </FormItem>
        <FormItem label="角色：">
          <Select v-model="addMechanism.accountRole" clearable  style="width: 376px">
            <Option v-for="(item,index) in listRole" :value="item.roleId" :key="index">{{item.roleName}}</Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="addswitch=false">取消</Button>
        <Button type="primary" @click="addOk('addMechanism')">新增</Button>
      </div>
    </Modal>
    <Modal
      v-model="detailSwitch"
      title="账户详情"  width="360px" :mask-closable="false">
      <Form :model="addMechanism"  label-position="right" :label-width="120">
        <FormItem label="账户名：">
          王宇
        </FormItem>
        <FormItem label="密码：">
          123456
        </FormItem>
        <FormItem label="手机号：">
          15217729009
        </FormItem>
        <FormItem label="邮箱：">
          wangyu@skyworth.com
        </FormItem>
        <FormItem label="角色：">
          超级管理员
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="detailSwitch=false">取消</Button>
        <Button type="primary" @click="deleteDetail">删除</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import titlePage from '../components/title-page.vue';
  import {fetchGet,fetchPost,fetchDelete} from '../api/index';
  import {verify} from '../utils/verify';
  import {keyHighLight,eachTextHighLight} from '../utils/keyFunction';
  export default {
    data () {
      return {
        title:'账户管理',
        addswitch:false,
        detailSwitch:false,
        total:0,
        listRole:[],
        pageSize:10,
        pageNumber:1,
        total:0,
        keyword:'',
        formLeft: {
          role: '',
          id: '',
          anKeyword: '',
        },
        addMechanism:{
          accountName:'',
          accountRole:'',
          cellphoneNumber:'',
          mailboxAccount:'',
          password:'',
        },
        ruleValidate: {
          accountName: [
            { required: true, type: 'string', message: '请输入账户名', trigger: 'blur' }
          ],
          password: [
            { required: true, type: 'string', message: '请输入密码', trigger: 'blur' }
          ],
          mailboxAccount: [
            { required: true, validator:verify.regMail, trigger: 'blur' }
          ],
          cellphoneNumber: [
            { required: true, validator:verify.mobilephone, trigger: 'blur' }
          ],
        },
        columns: [
          {
            title: '账户ID',
            key: 'accountId',
            align: 'center',
            //width: 320
            render: (h, params) => {
              return eachTextHighLight(h, params,this.keyword);
            }
          },
          {
            title: '账户名',
            key: 'accountName',
            align: 'center',
            render: (h, params) => {
              return eachTextHighLight(h, params,this.keyword);
            }
          },
          {
            title: '密码',
            key: 'address',
            align: 'center',
            render: (h, params) => {
              return eachTextHighLight(h, params,this.keyword);
            }
          },
          {
            title: '手机号码',
            key: 'cellphoneNumber',
            align: 'center',
            render: (h, params) => {
              return eachTextHighLight(h, params,this.keyword);
            }
          },
          {
            title: '邮箱',
            key: 'mailboxAccount',
            align: 'center',
            width: 220,
            render: (h, params) => {
              return eachTextHighLight(h, params,this.keyword);
            }
          },
          {
            title: '账户角色',
            key: 'accountRole',
            align: 'center',
            render: (h, params) => {
              return eachTextHighLight(h, params,this.keyword);
            }
          },
          {
            title: '操作',
            // key: 'action',
            //fixed: 'right',
            align: 'center',
            width: 150,
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
                      this.detail(params);
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
      this.select();
    },
    methods:{
      pageChange(num){//!!this.formLeft.anKeyword||!!this.formLeft.role||!!this.formLeft.id
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
      select(){
        fetchGet({
          url:'backstage/role',
          baseURL:'http://www.coo-share.com:8769/',
        }).then((res)=>{
          if(res.data.code==10000){
            this.listRole=res.data.obj;
          }else{
            this.listRole=[];
            this.$Message.warning(res.data.msg);
          }
        })
      },
      listData(){
        fetchGet({
          url:'backstage/backstage/account?sortOrder=desc&pageSize='+this.pageSize+'&pageNumber='+this.pageNumber,
          baseURL:'http://www.coo-share.com:8769/',
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
          url:'backstage/backstage/account?sortOrder=desc&pageSize='+this.pageSize+'&pageNumber='+this.pageNumber+'&keyword='+this.keyword,
          baseURL:'http://www.coo-share.com:8769/',
        }).then((res)=>{
          console.log(res,'searchlist-');
          if(res.data.code==10000){/*.data.code==10000*/
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
      addOk(name){
        this.$refs[name].validate((valid) =>{
          if(valid){
            fetchPost({
              url:'backstage/account',
              baseURL:'http://www.coo-share.com:8769/',
              params:{
                accountName:this.addMechanism.accountName,
                accountRole:this.addMechanism.accountRole,
                cellphoneNumber:this.addMechanism.cellphoneNumber,
                mailboxAccount:this.addMechanism.mailboxAccount,
                password:this.md5(this.addMechanism.password),
              }
            }).then((res)=>{
              console.log(res,'ddddddddddd----');
              if(res.data.code==10000){
                  this.addswitch=false;
                  this.listData();
              }else{
                this.addswitch=false;
                this.$Message.warning(res.data.msg);
              }
            })
          }else{
            this.$Message.error('请输入必填的信息！');
          }
        })
      },
      addswitchBtn(){
        this.addswitch=true;
      },
      detail(){
        this.detailSwitch=true
      },
      deleteDetail(){

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

