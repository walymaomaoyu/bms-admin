<template>
  <div>
    <title-page :title="title"></title-page>
    <div>
      <div class="addBtn">
        <Button type="primary"  @click.native="addswitchBtn">新增常见问题</Button>
      </div>
      <div>
        <Form :model="formLeft"  :label-width="74">
          <Row>
            <Col span="5">
              <FormItem label="作品ID:">
                <Input v-model="formLeft.input1"></Input>
              </FormItem>
            </Col>
            <Col span="5" offset="1">
              <FormItem label="标题:">
                <Input v-model="formLeft.input2"></Input>
              </FormItem>
            </Col>
            <Col span="5" offset="1">
              <FormItem label="分类:">
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
      title="新增常见问题"  width="500px" :mask-closable="false">
      <Form :model="addMechanism" ref="addMechanism" label-position="right" :rules="ruleValidate" :label-width="120">
        <FormItem label="分类：" prop="a">
          <Input v-model="addMechanism.a" style="width: 320px"></Input>
        </FormItem>
        <FormItem label="标题：" prop="b">
          <Input v-model="addMechanism.b" style="width: 320px"></Input>
        </FormItem>
        <FormItem label="显示端类别：">
          <Input v-model="addMechanism.c" style="width: 320px"></Input>
        </FormItem>
        <FormItem label="上传文件系统：" prop="d">
          <Input v-model="addMechanism.d" style="width: 320px"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="addswitch=false">取消</Button>
        <Button type="primary" @click="addOk('addMechanism')">新增</Button>
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
        title:'常见问题',
        total:0,
        pageSize:10,
        pageNumber:1,
        addswitch:false,
        formLeft: {
          input1: '',
          input2: '',
          input3: '',
          input4: '',
        },
        addMechanism:{
          a:'',
          b:'',
          c:'',
          d:'',
          e:'',
        },
        ruleValidate: {
          a: [
            { required: true, type: 'string', message: '请输入机构名称', trigger: 'blur' }
          ],
          d: [
            { required: true, type: 'string', message: '请输入机构管理员', trigger: 'blur' }
          ],
          b: [
            { required: true, type: 'string', message: '请输入机构电话', trigger: 'blur' }
          ],
        },
        columns: [
          {
            title: 'ID',
            key: 'name',
            align: 'center',
            //width: 320
          },
          {
            title: '标题',
            key: 'age',
            align: 'center',
          },
          {
            title: '文件系统',
            key: 'address',
            align: 'center',
          },
          {
            title: '发布时间',
            key: 'age',
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
          url:'works?sortOrder=desc&pageSize='+this.pageSize+'&pageNumber='+this.pageNumber,
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
      addOk(name){
        this.$refs[name].validate((valid) =>{
          if(valid){

          }else{
            this.$Message.error('请输入完整的信息！');
          }
        })
      },
      addswitchBtn(){
        this.addswitch=true;
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

