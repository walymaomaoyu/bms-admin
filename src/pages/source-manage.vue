<template>
  <div>
    <title-page :title="title"></title-page>
    <div>
      <div style="margin-top: 16px">
        <Form :model="formLeft"  :label-width="74">
          <Row>
            <Col span="4">
              <FormItem label="素材ID:">
                <Input v-model="formLeft.input1"></Input>
              </FormItem>
            </Col>
            <Col span="4" offset="1">
              <FormItem label="素材名称:">
                <Input v-model="formLeft.input2"></Input>
              </FormItem>
            </Col>
            <Col span="4" offset="1">
              <FormItem label="素材类型:">
                <Select v-model="formLeft.input3" clearable>
                  <Option value="1">111</Option>
                  <Option value="2">222</Option>
                  <Option value="3">333</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="4" offset="1">
              <FormItem label="素材状态:">
                <Select v-model="formLeft.input4" clearable>
                  <Option value="1">111</Option>
                  <Option value="2">222</Option>
                  <Option value="3">333</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="2" style="margin-left: 10px">
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
  </div>
</template>

<script>
  import titlePage from '../components/title-page.vue';
  import {fetchGet,fetchPost,fetchDelete} from '../api/index';
  export default {
    data () {
      return {
        title:'素材管理',
        total:0,
        pageSize:10,
        pageNumber:1,
        formLeft: {
          input1: '',
          input2: '',
          input3: '',
          input4: '',
        },
        columns: [
          {
            title: '素材ID',
            key: 'name',
            align: 'center',
            //width: 320
          },
          {
            title: '素材名称',
            key: 'age',
            align: 'center',
          },
          {
            title: '素材类型',
            key: 'address',
            align: 'center',
          },
          {
            title: '素材大小',
            key: 'age',
            align: 'center',
          },
          {
            title: '作者',
            key: 'address',
            align: 'center',
          },
          {
            title: '状态',
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
