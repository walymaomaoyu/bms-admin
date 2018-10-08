<template>
  <div>
    <title-page :title="title"></title-page>
    <div>
      <div style="margin-top: 16px">
        <Form :model="formLeft"  :label-width="74">
          <Row>
            <Col span="4">
              <FormItem label="关键字:">
                <Input v-model="keyword" placeholder="请输入您想搜索的关键字"></Input>
              </FormItem>
            </Col>
            <Col span="4" offset="1">
              <FormItem label="平台角色:">
                <Select v-model="formLeft.rolePla" clearable>
                  <Option value="1">111</Option>
                  <Option value="2">222</Option>
                  <Option value="3">333</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="4" offset="1">
              <FormItem label="机构角色:">
                <Select v-model="formLeft.roleIns" clearable>
                  <Option value="1">111</Option>
                  <Option value="2">222</Option>
                  <Option value="3">333</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="4" offset="1">
              <FormItem label="用户状态:">
                <Select v-model="formLeft.state" clearable>
                  <Option value="1">111</Option>
                  <Option value="2">222</Option>
                  <Option value="3">333</Option>
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
        title:'用户管理',
        total:0,
        pageSize:10,
        pageNumber:1,
        keyword:'',
        formLeft: {
          id: '',
          unKeyword: '',
          roleIns: '',
          rolePla: '',
          state: '',
        },
        columns: [
          {
            title: '用户ID',
            key: 'accountId',
            align: 'center',
            //width: 320
            render: (h, params) => {
              return eachTextHighLight(h, params,this.keyword);
            }
          },
          {
            title: '用户名',
            key: 'accountName',
            align: 'center',
            render: (h, params) => {
              return eachTextHighLight(h, params,this.keyword);
            }
          },
          {
            title: '手机号',
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
            width: 200,
            render: (h, params) => {
              return eachTextHighLight(h, params,this.keyword);
            }
          },
          {
            title: '机构角色',
            key: 'institutionRole',
            align: 'center',
            width: 90,
            render: (h, params) => {
              return eachTextHighLight(h, params,this.keyword);
            }
          },
          {
            title: '平台角色',
            key: 'platformRole',
            align: 'center',
            width: 90,
            render: (h, params) => {
              return eachTextHighLight(h, params,this.keyword);
            }
          },
          {
            title: '用户状态',
            key: 'status_',
            align: 'center',
            width: 90,
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
      pageChange(num){//!!this.formLeft.id||!!this.formLeft.unKeyword||!!this.formLeft.roleIns||!!this.formLeft.rolePla||!!this.formLeft.state
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
          url:'backstage/platform/account?sortOrder=desc&pageSize='+this.pageSize+'&pageNumber='+this.pageNumber,
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
          url:'backstage/platform/account?sortOrder=desc&pageSize='+this.pageSize+'&pageNumber='+this.pageNumber+'&keyword='+this.keyword,
          baseURL:'http://www.coo-share.com:8769/',
        }).then((res)=>{
          console.log(res,'searchlist-');
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
      }
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

