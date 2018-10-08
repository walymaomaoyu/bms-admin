<template>
    <div>
      <div class="title"><span  style="color: #2baee9" @click="$router.push('/worksManage')">作品管理</span><span class="space">&gt</span><span>图表展示</span></div>
      <div>
        <div class="box1">
          <span class="title-table1">行业作品数量分布图</span>
          <div id="main"></div>
        </div>
        <div class="box2">
          <span class="title-table2">行业作品比例分布图</span>
          <div id="circle"></div>
        </div>
      </div>
      <div>
        <div class="box1">
          <span class="title-table1">节日作品数量分布图</span>
          <div id="main2"></div>
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
        XdataTradeName:[],
        XdataTrade:[],
        XdataFestivalName:[],
        XdataFestival:[],
        ratioDataOption:[],
        ratioData:[],
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
            data:this.ratioDataOption
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
              data:this.ratioData
            }
          ]
        })
      },
      drawPie2(id){
        this.charts2 = echarts.init(document.getElementById(id));
        this.charts2.setOption({
          xAxis: {
            name:'行业名称',
            splitNumber:7,
            minInterval:1,
            maxInterval:2,
            interval:1,
            data: this.XdataTradeName,
            axisTick: {
              show: true,
              alignWithLabel:true,
              interval:0,
            },
            axisLabel: {
              formatter: this.XdataTradeName,
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
            data: this.XdataTrade,
          }
          ]
        })
      },
      drawPie4(id){
        this.charts4 = echarts.init(document.getElementById(id));
        this.charts4.setOption({
          xAxis: {
            name:'节日名称',
            splitNumber:7,
            minInterval:1,
            maxInterval:2,
            interval:1,
            data: this.XdataFestivalName,
            axisTick: {
              show: true,
              alignWithLabel:true,
              interval:0,
            },
            axisLabel: {
              formatter: this.XdataFestivalName,
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
              data: this.XdataFestival,
            }
          ]
        })
      },
      initTrade(){//行业作品数量
        fetchGet({
          url:'backstage/works/trade',
          baseURL:'http://www.coo-share.com:8773/',
        }).then((res)=>{
          if(res.data.code==10000){
              for(var i=0;i<res.data.obj.length;i++){
                if(res.data.obj[i].name==null){
                  this.XdataTrade.push(res.data.obj[i].value);
                  this.XdataTradeName.push('未知');
                }else{
                  this.XdataTrade.push(res.data.obj[i].value);
                  this.XdataTradeName.push(res.data.obj[i].name);
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
      initFestival(){//节日分布数据
        fetchGet({
          url:'backstage/works/festival',
          baseURL:'http://www.coo-share.com:8773/',
        }).then((res)=>{
          if(res.data.code==10000){
            for(var i=0;i<res.data.obj.length;i++){
              if(res.data.obj[i].name==null){
                this.XdataFestival.push(res.data.obj[i].value);
                this.XdataFestivalName.push('未知');
              }else{
                this.XdataFestival.push(res.data.obj[i].value);
                this.XdataFestivalName.push(res.data.obj[i].name);
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
      initRatio(){//作品比例
        fetchGet({
          url:'backstage/works/ratio',
          baseURL:'http://www.coo-share.com:8773/',
        }).then((res)=>{
          if(res.data.code==10000){
            this.ratioData=res.data.obj;
            for(var i=0;i<res.data.obj.length;i++){
              if(res.data.obj[i].name==null){
                this.ratioDataOption.push('未知');
                this.ratioData[i].name='未知';
              }else{
                this.ratioDataOption.push(res.data.obj[i].name);
              }
            };
            console.log(this.ratioDataOption,'nnnnnnnnnnnn')
            this.$nextTick(function(){
              this.drawPie('circle');
            });
          }else{
            this.$Message.warning(res.data.msg);
          }
        })
      },
    },
    created(){
        this.initTrade();
        this.initRatio();
        this.initFestival();
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
