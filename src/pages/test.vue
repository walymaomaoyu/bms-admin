<template>
  <div>
    <title-page :title="title"></title-page>
    <div v-for="item in testList">
      <span style="display:inline-block; width: 40px">姓名:</span><span style="display:inline-block; width: 60px">{{item.passenger_name}}</span><span>执行日期:</span><span style="display:inline-block; width: 100px">{{item.start_date}}</span><span>身份证:</span><span style="display:inline-block; width: 160px">{{item.passenger_id_no}}</span><span>被执行原因:</span><span style="display:inline-block; width: 560px">{{item.flag2}}</span>
    </div>
  </div>
</template>

<script>
  import titlePage from '../components/title-page.vue';
  import {fetchTest} from '../api/index';
  export default {
    data () {
      return {
        title:'测试',
        testList:[],
      }

    },
    components:{
      titlePage
    },
    created(){
      fetchTest({
        url:'http://10.0.0.72:3001/test',
        params:{
          arr:[{"arr":[{"class":"modelvideo","css":{"background-color":"rgba(0, 0, 0, 0.5)","height":"21.6em","left":"0em","position":"absolute","top":"0em","width":"38.4em","z-index":100},"id":"modeNo0","obj":{"html":"<image src=\"\" style=\"display:block;width: 100%;height: 100%;\">","path":"name1","type":5}}],"class":"model-box","css":{"-webkit-animation-duration":"0s","animation-duration":"0s","background-color":"rgba(255, 255, 255, 0.8)","background-repeat":"no-repeat","background-size":"100% 100%","color":"transparent","font-size":"20px","height":"100%","overflow":"hidden","position":"relative","width":"100%"},"fileName":[],"music":[],"musicTimeList":[],"obj":{"animation":"none","time":"1秒"},"time":"00:01:04"}]
        }
      }).then((res)=>{
        //this.testList=res.data.data.left.concat(res.data.data.right);
        console.log(res,'xxxxxxx');
      })
    },
    methods:{

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

