<template>
    <div>
      <div class="title"><span style="color: #2baee9" @click="$router.push('/deviceManage')">设备管理</span><span class="space">&gt</span><span>图表展示</span></div>
      <div>
        <div class="box1">
          <span class="title-table1">设备机芯数量分布图</span>
          <div id="main"></div>
        </div>
        <div class="box2">
          <span class="title-table2">设备尺寸分布图</span>
          <div id="circle"></div>
        </div>
      </div>
      <div>
        <div class="box1">
          <span class="title-table1">设备机型数量分布图</span>
          <div id="main2"></div>
        </div>
        <div class="box2">
          <span class="title-table2">设备分辨率分布图</span>
          <div id="circle2"></div>
        </div>
      </div>
    </div>
</template>

<script>
  import echarts from 'echarts';
  import {fetchGet,fetchPost,fetchDelete} from '../../api/index';
  export default {
    name: '',
    data () {
      return {
        charts: '',
        charts2: '',
        charts3: '',
        charts4: '',
        counts:[],
        xdata:[],
        counts2:[],
        xdata2:[],
        XdataName:[],
        Xdata:[],
        XdataModelName:[],
        XdataModel:[],
        sizeDataOption:[],
        sizeData:[],
        resolutionDataOption:[],
        resolutionData:[],
        opinion:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
        opinionData:[
          {value:335, name:'直接访问'},
          {value:310, name:'邮件营销'},
          {value:234, name:'联盟广告'},
          {value:135, name:'视频广告'},
          {value:1548, name:'搜索引擎'}
        ],

      }
    },
    methods:{
      drawPie(id){
        this.charts = echarts.init(document.getElementById(id));
        this.charts.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '数量:{c} 占比:({d}%)'
          },
          legend: {
            orient: 'horizontal',
            x: 'right',
            itemWidth: 10,
            itemHeight: 10,
            data:this.sizeDataOption
          },
          series: [
            {
              name:'',
              type:'pie',
              radius:['40%','60%'],
              avoidLabelOverlap: false,
              label: {
                position:'outside',
                show: true,
              },
              labelLine: {
                normal: {
                  show: true
                },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'blod'
                }
              }
              },
              data:this.sizeData
            }
          ]
        })
      },
      drawPie3(id){
        this.charts3 = echarts.init(document.getElementById(id));
        this.charts3.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '数量:{c} 占比:({d}%)'
          },
          legend: {
            orient: 'horizontal',
            x: 'right',
            itemWidth: 10,
            itemHeight: 10,
            data:this.resolutionDataOption
          },
          series: [
            {
              name:'',
              type:'pie',
              radius:['40%','60%'],
              avoidLabelOverlap: false,
              label: {
                position:'outside',
                show: true,
              },
              clockwise:false,
              minAngle:8,
              //avoidLabelOverlap:false,
              labelLine: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'blod'
                  }
                }
              },
              data:this.resolutionData
            }
          ]
        })
      },
      drawPie2(id){
        this.charts2 = echarts.init(document.getElementById(id));
        this.charts2.setOption({
          xAxis: {
            name:'机芯名称',
            splitNumber:7,
            minInterval:1,
            maxInterval:2,
            interval:1,
            data: this.XdataName,
            axisTick: {
              show: true,
              alignWithLabel:true,
              interval:0,
            },
            axisLabel: {
              formatter: this.XdataName,
              rotate:30,
            }
          },
          yAxis: {
            splitLine: {show: true}
          },
          animationDurationUpdate: 300,
          tooltip:{
            trigger:'item',
            formatter:'{b}:{c}',

          },
          series: [
          {
            type: 'bar',
            barWidth: 20,
            z: 10,
            data: this.Xdata,
          }
          ]
        })
      },
      drawPie4(id){
        this.charts4 = echarts.init(document.getElementById(id));
        this.charts4.setOption({
          xAxis: {
            name:'机型名称',
            splitNumber:7,
            minInterval:1,
            maxInterval:2,
            interval:1,
            data: this.XdataModelName,
            axisTick: {
              show: true,
              alignWithLabel:true,
              interval:0,
            },
            axisLabel: {
              formatter: this.XdataModelName,
              rotate:50,
            }
          },
          yAxis: {
            splitLine: {show: true}
          },
          animationDurationUpdate: 300,
          tooltip:{
            trigger:'item',
            formatter:'{b}:{c}',

          },
          series: [
            {
              type: 'bar',
              barWidth: 20,
              z: 10,
              data: this.XdataModel,
            }
          ]
        })
      },
      initShip(){
        fetchGet({
          url:'backstage/terminal/ship',
          baseURL:'http://www.coo-share.com:8771/',
        }).then((res)=>{
          if(res.data.code==10000){
              for(var i=0;i<res.data.obj.length;i++){
                if(res.data.obj[i].name==null){
                  this.Xdata.push(res.data.obj[i].value);
                  this.XdataName.push('未知');
                }else{
                  this.Xdata.push(res.data.obj[i].value);
                  this.XdataName.push(res.data.obj[i].name);
                }
              };
              this.$nextTick(function() {
                this.drawPie2('main');
              });
          }else{
            this.$Message.warning(res.data.msg);
          }
        })
      },
      initModel(){
        fetchGet({
          url:'backstage/terminal/model',
          baseURL:'http://www.coo-share.com:8771/',
        }).then((res)=>{
          if(res.data.code==10000){
            for(var i=0;i<res.data.obj.length;i++){
              if(res.data.obj[i].name==null){
                this.XdataModel.push(res.data.obj[i].value);
                this.XdataModelName.push('未知');
              }else{
                this.XdataModel.push(res.data.obj[i].value);
                this.XdataModelName.push(res.data.obj[i].name);
              }
            };
            this.$nextTick(function() {
              this.drawPie4('main2');
            });
          }else{
            this.$Message.warning(res.data.msg);
          }
        })
      },
      initSize(){
        fetchGet({
          url:'backstage/terminal/size',
          baseURL:'http://www.coo-share.com:8771/',
        }).then((res)=>{
          if(res.data.code==10000){
            this.sizeData=res.data.obj;
            for(var i=0;i<res.data.obj.length;i++){
              if(res.data.obj[i].name==null){
                this.sizeDataOption.push('未知');
                this.sizeData[i].name='未知';
              }else{
                this.sizeDataOption.push(res.data.obj[i].name);
              }
            };
            console.log(this.sizeDataOption,'nnnnnnnnnnnn')
            this.$nextTick(function(){
              this.drawPie('circle');
            });
          }else{
            this.$Message.warning(res.data.msg);
          }
        })
      },
      initResolution(){
        fetchGet({
          url:'backstage/terminal/resolution',
          baseURL:'http://www.coo-share.com:8771/',
        }).then((res)=>{
          if(res.data.code==10000){
            this.resolutionData=res.data.obj;
            for(var i=0;i<res.data.obj.length;i++){
              if(res.data.obj[i].name==null){
                this.resolutionDataOption.push('未知');
                this.resolutionData[i].name='未知';
              }else{
                this.resolutionDataOption.push(res.data.obj[i].name);
              }
            };
            console.log(this.resolutionDataOption,'wwwwwwwwwwwww')
            this.$nextTick(function(){
              this.drawPie3('circle2');
            });
          }else{
            this.$Message.warning(res.data.msg);
          }
        })
      },
    },
    created(){
        this.initShip();
        this.initSize();
        this.initModel();
        this.initResolution();
    },
    //调用
    mounted(){
      this.$nextTick(function() {

        //this.drawPie4('main2');
        //this.drawPie3('circle2');
      })
    }
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
  #main{
    width: 700px;
    height: 360px;
  }
  #circle{
    width: 400px;
    height: 360px;
  }
  #main2{
    width: 700px;
    height: 360px;
  }
  #circle2{
    width: 400px;
    height: 360px;
  }
  .title-table1{
    display: inline-block;
    width: 730px;
    background-color: #f8f8f8;
    height: 34px;
    line-height: 34px;
    color: #4b4a4a;
    padding-left: 16px;
  }
  .title-table2{
    display: inline-block;
    width: 400px;
    background-color: #f8f8f8;
    height: 34px;
    line-height: 34px;
    color: #4b4a4a;
    padding-left: 16px;
  }
  .box1{
    display: inline-block;
    border: 1px solid #efefef;
    border-radius: 4px;
    margin: 10px 20px 5px 20px;
  }
  .box2{
    display: inline-block;
    border: 1px solid #efefef;
    border-radius: 4px;
    margin-bottom: 5px;
  }
</style>
