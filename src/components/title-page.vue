<template>
    <div class="title">
      {{title}}
    </div>
</template>

<script>
    export default {
      props:['title'],
      data(){
        return{

        }
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
</style>
