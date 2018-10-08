<template>
  <div>
    <title-page :title="title"></title-page>
    <Tabs class="tab">
      <TabPane label="Android-TV版" icon="android-desktop">
        <div class="addBtn">
          <Button type="primary"  @click.native="addswitchBtn">新增Android-TV版</Button>
        </div>
        <div>
          <Form :model="formLeft"  :label-width="74">
            <Row>
              <Col span="4">
                <FormItem label="版本名称:">
                  <Input v-model="formLeft.input1"></Input>
                </FormItem>
              </Col>
              <Col span="4" offset="1">
                <FormItem label="版本号:">
                  <Input v-model="formLeft.input2"></Input>
                </FormItem>
              </Col>
              <Col span="4" offset="1">
                <FormItem label="机芯/机型:">
                  <Select v-model="formLeft.input3" clearable>
                    <Option value="1">111</Option>
                    <Option value="2">222</Option>
                    <Option value="3">333</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="2" style="margin-left: 20px">
                <Button type="primary">查询</Button>
              </Col>
            </Row>
          </Form>
        </div>
        <div style="display: flex">
          <div class="tabLeft">
            <div>
              <Tree :data="data3" show-checkbox multiple></Tree>
              <Tree :data="data4" show-checkbox multiple></Tree>
            </div>
            <Button  @click.native="addswitchBtn2" style="width: 90%">新增机型</Button>
          </div>
          <div class="tabRight">
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
      </TabPane>
      <TabPane label="Android-Phone版" icon="social-android">
        <div class="addBtn">
          <Button type="primary"  @click.native="addswitchBtn">新增Android-Phone版</Button>
        </div>
        <div>
          <Form :model="formLeft"  :label-width="74">
            <Row>
              <Col span="4">
                <FormItem label="版本名称:">
                  <Input v-model="formLeft.input1"></Input>
                </FormItem>
              </Col>
              <Col span="4" offset="1">
                <FormItem label="版本号:">
                  <Input v-model="formLeft.input2"></Input>
                </FormItem>
              </Col>
              <Col span="2" style="margin-left: 20px">
                <Button type="primary">查询</Button>
              </Col>
            </Row>
          </Form>
          <div>
            <Table stripe border  :columns="columns" :data="data" height="522"></Table>
          </div>
          <div class="pages">
            <Page :total="40"
                  show-sizer
                  @on-change="pageChange"
                  @on-page-size-change="pageSizeChange"/>
          </div>
        </div>
      </TabPane>
      <TabPane label="Ios-Phone版" icon="social-apple">
        <div class="addBtn">
          <Button type="primary"  @click.native="addswitchBtn">新增Ios-Phone版</Button>
        </div>
        <div>
          <Form :model="formLeft"  :label-width="74">
            <Row>
              <Col span="4">
                <FormItem label="版本名称:">
                  <Input v-model="formLeft.input1"></Input>
                </FormItem>
              </Col>
              <Col span="4" offset="1">
                <FormItem label="版本号:">
                  <Input v-model="formLeft.input2"></Input>
                </FormItem>
              </Col>
              <Col span="2" style="margin-left: 20px">
                <Button type="primary">查询</Button>
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
      </TabPane>
    </Tabs>
    <Modal
      v-model="addswitch2"
      title="新增机型"  width="500px" :mask-closable="false">
      <Form  label-position="right"  :label-width="80">
        <FormItem label="机型名：">
          <Input v-model="addDate.model" style="width: 376px"></Input>
        </FormItem>
        <FormItem label="机芯名：">
          <Input v-model="addDate.ship" style="width: 376px"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="addswitch2=false">取消</Button>
        <Button type="primary" @click="addSwitch2Server">新增</Button>
      </div>
    </Modal>
    <Modal
      v-model="addswitch"
      title="新增Android-TV版"  width="500px" :mask-closable="false">
      <Form  label-position="right"  :label-width="80">
        <FormItem label="版本名称：">
          <Input v-model="addDate.model" style="width: 376px"></Input>
        </FormItem>
        <FormItem label="版本号：">
          <Input v-model="addDate.ship" style="width: 376px"></Input>
        </FormItem>
        <FormItem label="更新内容：">
          <Input v-model="addDate.ship" style="width: 376px"></Input>
        </FormItem>
        <FormItem label="文件上传：">
          <Upload action="//jsonplaceholder.typicode.com/posts/"
                  :on-success="shiyan"
                  :before-upload="handleUpload">
            <Button type="dashed" icon="ios-cloud-upload-outline">选择文件</Button>
          </Upload>
          <div v-if="file !== null">上传文件: {{ file.name }} <Button type="ghost" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '上传中...' : '点击上传' }}</Button></div>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="addswitch=false">取消</Button>
        <Button type="primary" @click="addSwitch2Server">新增</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import titlePage from '../components/title-page.vue';
  import {fetchGet,fetchPost,fetchDelete} from '../api/index';
export default {
  data () {
    return {
      title:'版本管理',
      total:0,
      pageSize:10,
      pageNumber:1,
      addswitch:false,
      addswitch2:false,
      loadingStatus:false,
      formLeft: {
        input1: '',
        input2: '',
        input3: '',
        input4: '',
      },
      addDate:{
        model:'',
        ship:'',
      },
      columns: [
        {
          title: '版本名称',
          key: 'name',
          align: 'center',
          width: 210
        },
        {
          title: '版本号',
          key: 'code',
          align: 'center',
          width: 90

        },
        {
          title: '文件大小',
          key: 'size',
          align: 'center',
          width: 100,
        },
        {
          title: '更新时间',
          key: 'updateTime',
          align: 'center',
          width: 140
        },
        {
          title: '内容',
          key: 'description',
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
      data:[],
      list:[],
      test:[],
      data3:[
        {
          title: '通用版',
          expand: true,
          render:(h,{root,node,data})=>{
            return h('span', {
              style: {
                display: 'inline-block',
                width: '100%'
              }
            },[
              h('span', [
                h('Icon', {
                  props: {
                    type: 'ios-folder-outline'
                  },
                  style: {
                    marginRight: '8px'
                  }
                }), h('span', data.title)
              ]),
            ])
          },
          children:[]
        }
      ],
      file:null,
      data4: [
        {
          title: '适配版',
          expand: true,
          render:(h,{root,node,data})=>{
            return h('span', {
              style: {
                display: 'inline-block',
                width: '100%'
              }
            },[
              h('span', [
                h('Icon', {
                  props: {
                    type: 'ios-folder-outline'
                  },
                  style: {
                    marginRight: '8px'
                  }
                }), h('span', data.title)
              ]),
            ])
          },
          children: [
            {
              title: '8H12dddZ',
              children: [
                {
                  title: '50E388G',
                },
                {
                  title: '65E388G'
                }
              ]
            },
            {
              title: 'rxxxxk',
              children: [
                {
                  title: '3368',
                }
              ]
            }
          ]
        }
      ]
    }
  },
  components:{
    titlePage
  },
  created(){
    this.listData();
    this.getDeviceList();
  },
  methods:{
    shiyan(response, file, fileList){
      console.log(response, file, fileList,'response, file, fileList');
    },
    handleUpload (file) {
      console.log(file,'file....');
      this.file = file;
      return false;
    },
    upload () {
      this.loadingStatus = true;
      setTimeout(() => {
        this.file = null;
        this.loadingStatus = false;
        this.$Message.success('Success')
      }, 1500);
    },
    pageChange(num){
      console.log(num,'pageChange');
      this.pageNumber=num;
      this.listData();
    },
    pageSizeChange(num){
      console.log(num,'pageSizeChange');
      this.pageSize=num;
      this.listData();
    },
    listData(){
      fetchGet({
        url:'backstage/tv/version?sortOrder=desc&pageSize='+this.pageSize+'&pageNumber='+this.pageNumber,
        baseURL:'http://www.coo-share.com:8775/',
      }).then((res)=>{
        console.log(res,'xxxxxxxxxxxxxxx');
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
    getDeviceList(){
      fetchGet({
        url:'backstage/device',
        baseURL:'http://www.coo-share.com:8775/',
      }).then((res)=>{
        console.log(res,'yyyyyyyyyy');
        if(res.data.code==10000){
            this.list=res.data.obj;
            this.data4[0].children=this.list;
            console.log(this.list,'this.list');
        }else{
          this.$Message.warning(res.data.msg);
        }
      })
    },
    addswitchBtn(){
      this.addswitch=true;
    },
    addswitchBtn2(){
      this.addswitch2=true;
      this.addDate.ship='';
      this.addDate.model='';
    },
    addSwitch2Server(){
        if(!!this.addDate.model&&!!this.addDate.ship){
          fetchPost({
            url:'backstage/device',
            baseURL:'http://www.coo-share.com:8775/',
            params:{
              model:this.addDate.model,
              ship:this.addDate.ship,
            }
          }).then((res)=>{
            if(res.data.code==10000){
              this.getDeviceList();
              this.addswitch2=false;
              this.$Message.warning('添加成功！');
            }else{
              this.$Message.warning(res.data.msg);
            }
          })
        }else{
          this.$Message.warning('请输入完整信息！');
        }
    }
  }
}
</script>
<style scoped>
.tab{
  margin:10px 14px 0 14px;
}
.addBtn{
  margin-bottom: 14px;
}
.tabLeft{
  display: inline-block;
  position: relative;
  width: 20%;
 /* border-right: 1px solid #ccc;*/
}
.tabRight{
  display: inline-block;
  width: 79%;
}
</style>
