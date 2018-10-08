<template>
  <div class="all">
    <div class="mid">
      <img src="../../assets/img/logo_login.png" alt="logo">
      <div>
        <div class="input">
          <Form>
            <Row>
              <Col>
                  <Input v-model="accountName" autocomplete="on"></Input>
              </Col>
            </Row>
            <Row>
              <Col>
                  <Input style="margin: 30px 0 36px 0" v-model="password"></Input>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button type="primary" shape="circle" @click.native="login" style="width: 288px">立即登录</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {fetchLoginPost} from '../../api/index';
  import {setStore} from '../../utils/utils';
    export default {
        name: "login",
      data(){
          return{
              accountName: '',
              password: '',
          }
      },
      methods:{
        login(){
          this.$Spin.show();
          if(!!this.accountName&&!!this.password){
            fetchLoginPost({
              url:'backstage/session',
              baseURL:'http://www.coo-share.com:8769/',
              params:{
                accountName:'admin',
                password:this.md5('coo-share'),
                //accountName:'wangyu',
              },
            }).then((res)=>{
              if(res.data.code==10000){
                this.$Spin.hide();
                setStore('user', res.data.obj);
                this.$router.push('/home');
              }else{
                this.$Spin.hide();
                this.$Message.warning(res.data.msg);
              }
            })
          }else{
            this.$Spin.hide();
            this.$Message.warning('账号和密码不能为空！');
          }
        }
      }
    }
</script>

<style scoped>
.all{
  height: 100%;
  background: url(../../assets/img/login_bg.png) repeat-x;
}
  .mid{
    text-align: center;
  }
  img{
    margin-top: 130px;
  }
  .input{
    display: inline-block;
    width: 288px;
    margin-top: 166px;
  }
</style>
