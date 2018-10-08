<template>
  <div>
    <title-page :title="title"></title-page>
    <div>
      <div class="addBtn">
        <Button type="primary" @click.native="$router.push('/chartShow')">设备管理图表</Button>
      </div>
      <div>
        <Form :model="formLeft"  :label-width="90">
          <Row>
            <Col span="5">
              <FormItem label="关键字:">
                <Input v-model="keyword" placeholder="请输入您想搜索的关键字"></Input>
              </FormItem>
            </Col>
            <Col span="5" offset="1">
              <FormItem label="设备尺寸:">
                <Select v-model="formLeft.size" clearable>
                  <Option value="40">40</Option>
                  <Option value="45">45</Option>
                  <Option value="50">50</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="5" offset="1">
              <FormItem label="设备分辨率:">
                <Select v-model="formLeft.resolution" clearable>
                  <Option value="1920*1080">1920*1080</Option>
                  <Option value="1080*1920">1080*1920</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="5">
              <FormItem label="设备比例:">
                <Select v-model="formLeft.ratio" clearable>
                  <Option value="0">16:9</Option>
                  <Option value="1">9:16</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="5" offset="1">
              <FormItem label="设备机芯:">
                <Select v-model="formLeft.ship" clearable>
                  <Option value="rk3368">rk3368</Option>
                  <Option value="8H12Z">8H12Z</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="5" offset="1">
              <FormItem label="设备机型:">
                <Select v-model="formLeft.model" clearable>
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
        title:'设备管理',
        total:0,
        pageSize:10,
        pageNumber:1,
        formLeft: {
          size: '',
          resolution: '',
          ratio: '',
          ship: '',
          model: '',
        },
        keyword:'',
        columns: [
          /*{
            title: '设备ID',
            key: 'id',
            align: 'center',
          },*/
          {
            title: '设备编号',
            key: 'number',
            align: 'center',
            width: 260,
            render: (h, params) => {
              /*var positions = new Array();
              function searchSubStr(str,subStr){
                var pos = str.indexOf(subStr);
                while(pos>-1){
                  positions.push(pos);
                  pos = str.indexOf(subStr,pos+1);
                }
              }
              searchSubStr(params.row[params.column.key].toLowerCase(),this.keyword.toLowerCase());
              console.log(positions,'positions');
              //var test=params.row[params.column.key].trim().match(/8/gi);
              //console.log(test,'test');
              var testArr=[];
              var k=0;
              var str=params.row[params.column.key].trim();
              for(let i=0;i<str.length;i++){
                if(i==positions[k]){
                  for(let j=0;j<this.keyword.length;j++){
                    testArr.push(h('Span', {
                      style: {
                        color: '#007dff',
                        fontSize:'16px',
                        bold:700,
                      },
                    },str[i+j]));
                  }
                  i+=this.keyword.length-1;
                  k++;
                }else{
                  testArr.push(h('Span',str[i]));
                }
              }
              return h('div', testArr);*/
             return eachTextHighLight(h, params,this.keyword);
            }
          },
          {
            title: '设备名称',
            key: 'name',
            align: 'center',
            render: (h, params) => {
              return eachTextHighLight(h, params,this.keyword);
            }
          },
          {
            title: '设备尺寸',
            key: 'size',
            align: 'center',
            width: 100,
            render: (h, params) => {
              return eachTextHighLight(h, params,this.keyword);
            }
          },
          {
            title: '所属机构',
            key: 'institutionName',
            align: 'center',
            render: (h, params) => {
              return eachTextHighLight(h, params,this.keyword);
            }
          },
          {
            title: '设备状态',
            key: 'status_',
            align: 'center',
            width: 100,
            render: (h, params) => {
              if(params.row.status_ === true){
                return h('div', [
                  h('Span', {
                    style: {
                      color: '#11cd34',
                      fontSize:'12px',
                    },
                  },"在线"),
                ]);
              }else{
                return h('div', [
                  h('Span', {
                    style: {
                      color: '#ea2814',
                      fontSize:'12px',
                    },
                  },"离线"),
                ]);
              }

            }
          },
          {
            title: '设备地址',
            key: 'address',
            align: 'center',
            render: (h, params) => {
              return eachTextHighLight(h, params,this.keyword);
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
      pageChange(num){//formLeft.size||!!this.formLeft.resolution||!!this.formLeft.ratio||!!this.formLeft.ship||!!this.formLeft.model
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
          url:'backstage/terminal?sortOrder=desc&pageSize='+this.pageSize+'&pageNumber='+this.pageNumber,
          baseURL:'http://www.coo-share.com:8771/',
        }).then((res)=>{
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
        fetchGet({//+'&size='+this.formLeft.size+'&resolution='+this.formLeft.resolution+'&ratio='+this.formLeft.ratio+'&ship='+this.formLeft.ship+'&model='+this.formLeft.model
          url:'/backstage/terminal?sortOrder=desc&pageSize='+this.pageSize+'&pageNumber='+this.pageNumber+'&keyword='+this.keyword,
          baseURL:'http://www.coo-share.com:8771/',
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

