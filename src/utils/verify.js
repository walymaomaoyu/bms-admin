
const verify = {
  //身份证
  idcard:(rule,value,callback) => {
    if(!value){
      return callback(new Error('请输入身份证号码'));
    }else{
      let status = validateIdcard(value);
      if(!status){
        return callback(new Error('请输入正确的身份证号码'));
      }else{
        callback();
      }
    }
  },
  //手机号码
  mobilephone:(rule,value,callback) => {
    if(!value){
      return callback(new Error('请输入手机号码'));
    }else{
      let status = /^1(3|4|5|7|8)\d{9}$/.test(value);
      if(!status){
        return callback(new Error('请输入正确的手机号码'));
      }else{
        callback();
      }
    }
  },
  //银行卡
  bankaccount:(rule,value,callback) => {
    if(!value){
      return callback(new Error('请输入银行卡号'));
    }else{
      let status = /^(\d{15}|\d{16}|\d{19})$/.test(value);
      if(!status){
        return callback(new Error('请输入正确的银行卡号'));
      }else{
        callback();
      }
    }
  },
  //邮箱
  regMail:(rule,value,callback) => {
    if(!value){
      return callback(new Error('请输入邮箱'));
    }else{
      let status = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
      if(!status){
        return callback(new Error('请输入正确的邮箱'));
      }else{
        callback();
      }
    }
  },
  //校验非负浮点数
  regNumber:(rule,value,callback) => {
    //非必填
    if(value =='' || value == undefined){
      callback();
    }else{
      //可输入0
      let status = /^\d+(\.\d+)?$/.test(value);
      if(!status){
        return callback(new Error('请输入数字'));
      }else{
        callback();
      }
    }
  }
};

function validateIdcard(val){
  var validateReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
  if (validateReg.test(val)) {
    if (val.length == 18) {
      var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
      var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
      var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
      for (var i = 0; i < 17; i++) {
        idCardWiSum += val.substring(i, i + 1) * idCardWi[i];
      }

      var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
      var idCardLast = val.substring(17);//得到最后一位身份证号码

      //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod == 2) {
        if (idCardLast == "X" || idCardLast == "x") {
          return true;
        } else {
          return false;
        }
      } else {
        //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (idCardLast == idCardY[idCardMod]) {
          return true;
        } else {
          return false;
        }
      }
    }
  } else {
    return false;
  }
}

//输出
export  {
  verify
}
