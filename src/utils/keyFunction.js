export const keyHighLight = (h,params,keyWord) => {
  let comArr=[];
  let arrT=params.row[params.column.key];
  if(typeof arrT=="string"){
    var arr = arrT.trim().split(keyWord);
  }else if(typeof arrT=="number"){
    var arr = arrT.toString().trim().split(keyWord);
  }else{
    var arr=[]
  }
  if(arr.length>1){
    for(let i=0;i<arr.length;i++){
      if(arr[i]==''&&i!=arr.length-1){
       // console.log('11111');
        comArr.push(h('Span', {
          style: {
            color: '#007dff',
            fontSize:'14px',
            bold:600,
          },
        },keyWord));
      }else if(i==(arr.length-1)){//
        //console.log('22222');
        comArr.push(h('Span',arr[i]));
      }else{
       // console.log('33333');
        comArr.push(h('Span',arr[i]));
        comArr.push(h('Span', {
          style: {
            color: '#007dff',
            fontSize:'14px',
          },
        },keyWord));
      }
    }
    return h('div', comArr);
  }else{
    return h('div', [
      h('Span',params.row[params.column.key]),
    ]);
  }
};


export const eachTextHighLight =(h,params,keyWord)=>{
  var positions = new Array();
  function searchSubStr(str,subStr){
    var pos = str.indexOf(subStr);
    while(pos>-1){
      positions.push(pos);
      pos = str.indexOf(subStr,pos+1);
    }
  };
  let strT=params.row[params.column.key];
  if(typeof strT=="string"){
    var strings = strT.trim();
  }else if(typeof strT=="number"){
    var strings = strT.toString().trim();
  }else{
    var strings='';
  }
  if(strings!=''&&keyWord!=''){
    searchSubStr(strings.toLowerCase(),keyWord.toLowerCase());
    var testArr=[];
    var k=0;
    var str=strings.trim();
    for(let i=0;i<str.length;i++){
      if(i==positions[k]){
        for(let j=0;j<keyWord.length;j++){
          testArr.push(h('Span', {
            style: {
              color: '#007dff',
              fontSize:'16px',
              bold:800,
            },
          },str[i+j]));
        }
        i+=keyWord.length-1;
        k++;
      }else{
        testArr.push(h('Span',str[i]));
      }
    }
    return h('div', testArr);
  }else{
    return h('div', [
      h('Span',params.row[params.column.key]),
    ]);
  }
}
