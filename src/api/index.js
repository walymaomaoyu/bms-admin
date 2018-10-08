import axios from 'axios';
import iview from 'iview';
import {getStore} from '../utils/utils.js';

//axios.defaults.baseURL = 'https://ad.lcgoo.cn/bg/';
//axios.defaults.baseURL = 'http://10.0.0.192:8080/';
//axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

window.iview = iview;

axios.interceptors.request.use( config => {
  iview.LoadingBar.start();
  return config;
}, error => {
  return Promise.reject(error);
});
axios.interceptors.response.use(function(response){
  iview.LoadingBar.finish();
  if(response){
   // console.log(response,'11111111');
  }
  return response;
},error=>{
  return Promise.reject(error);
});




/*axios.interceptors.response.use((response) => {
  const data = response.data
// 根据返回的code值来做不同的处理（和后端约定）
  switch (data.code) {
    case '0':
      // 举例
      // exp: 修复iPhone 6+ 微信点击返回出现页面空白的问题
      if (isIOS()) {
        // 异步以保证数据已渲染到页面上
        setTimeout(() => {
          // 通过滚动强制浏览器进行页面重绘
          document.body.scrollTop += 1
        }, 0)
      }
      // 这一步保证数据返回，如果没有return则会走接下来的代码，不是未登录就是报错
      return data
    // 需要重新登录
    case 'SHIRO_E5001':
      // 微信生产环境下授权登录
      if (isWeChat() && IS_PRODUCTION) {
        axios.get(apis.common.wechat.authorizeUrl).then(({ result }) => {
          location.replace(global.decodeURIComponent(result))
        })
      } else {
        // 否则跳转到h5登录并带上跳转路由
        const search = encodeSearchParams({
          next: location.href,
        })
        location.replace(`/user/login?${search}`)
      }
      // 不显示提示消息
      data.description = ''
      break
    default:
  }
  // 若不是正确的返回code，且已经登录，就抛出错误
  const err = new Error(data.description)
  err.data = data
  err.response = response
  throw err
}, (err) => { // 这里是返回状态码不为200时候的错误处理
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break
      case 401:
        err.message = '未授权，请登录'
        break
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器内部错误'
        break
      case 501:
        err.message = '服务未实现'
        break
      case 502:
        err.message = '网关错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网关超时'
        break
      case 505:
        err.message = 'HTTP版本不受支持'
        break
      default:
    }
  }
  return Promise.reject(err)
})*/




export function fetchTest(data){
 // console.log(JSON.stringify(data.params));
  return axios({
    headers: {
      // 'x-csrf-token': csrfToken,
      //'Access-Control-Allow-Headers':'*',
      'Content-Type':'application/json; charset=UTF-8',
      //'enctype':'multipart/form-data',
    },
    //baseURL:'https://ad.lcgoo.cn/bg/',
    //baseURL:data.baseURL,
    method: 'post',
    url: data.url,
    data:JSON.stringify(data.params),
    //timeout: 10000,
  }).then(response=>{
    return response;
  }).catch(error=>{
    console.log(error);
  })
}


export function fetchLoginPost(data){
  return axios({
    headers: {
      // 'x-csrf-token': csrfToken,
      'Content-Type':'application/json; charset=UTF-8',
    },
    //baseURL:'https://ad.lcgoo.cn/bg/',
    baseURL:data.baseURL,
    method: 'post',
    url: data.url,
    data:JSON.stringify(data.params),
    timeout: 10000,
  }).then(response=>{
    return response;
  }).catch(error=>{
    console.log(error);
  })
}


export function fetchPost(data){
  return axios({
    headers: {
      // 'x-csrf-token': csrfToken,
      'Content-Type':'application/json; charset=UTF-8',
      authorization:getStore('user').key+'_'+getStore('user').value
    },
    //baseURL:'https://ad.lcgoo.cn/bg/',
    baseURL:data.baseURL,
    method: 'post',
    url: data.url,
    data:JSON.stringify(data.params),
    timeout: 10000,
  }).then(response=>{
    return response;
  }).catch(error=>{
    console.log(error);
  })
}

export function fetchGet(data){
  return axios({
    headers: {
      'Content-Type':'application/json; charset=UTF-8',
      authorization:getStore('user').key+'_'+getStore('user').value
    },
    //baseURL:'https://ad.lcgoo.cn/bg/',
    baseURL:data.baseURL,
    method: 'get',
    url: data.url,
    timeout: 10000,
  }).then(response=>{
    return response;
  }).catch(error=>{
    console.log(error);
  })
}


export function fetchDelete(data){
  return axios({
    headers: {
      'Content-Type':'application/json; charset=UTF-8',
      authorization:getStore('user').key+'_'+getStore('user').value
    },
    baseURL:data.baseURL,
    method: 'delete',
    url: data.url,
    data:JSON.stringify(data.params),
    timeout: 10000,
  }).then(response=>{
    return response;
  }).catch(error=>{
    console.log(error);
  })


  /*return axios.delete("https://ad.lcgoo.cn/bg/ins/id", {
    data: datas,
    headers: {
      'Content-Type':'application/json; charset=UTF-8',
      authorization:'manage-'+getStore('user').userId+'_'+getStore('user').token
    },
  }).then(response=>{
      return response;
    }).catch(error=>{
      console.log(error);
    })*/

}

export function fetchPatch(data){
  return axios({
    headers: {
      'Content-Type':'application/json; charset=UTF-8',
      authorization:getStore('user').key+'_'+getStore('user').value
    },
    baseURL:data.baseURL,
    method: 'patch',
    url: data.url,
    data:JSON.stringify(data.params),
    timeout: 10000,
  }).then(response=>{
    return response;
  }).catch(error=>{
    console.log(error);
  })
}
