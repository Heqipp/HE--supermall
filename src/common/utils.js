//防抖函数：
export function debouce(func,delay){

  let timer=null;
  return function(...args) {
    if(timer) {
      // 如果上次的定时器还存在，则清除。重新等待时间
      clearTimeout(timer);
    }
    timer=setTimeout(()=> {
      // 里边的闭包的this必须保持和callback保持一致。确保使用ok
    func(...args);
    }, delay)
  }
}
//格式化时间戳
export function formatDate(date, fmt) {

  if (/(y+)/.test(fmt)) {

    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));

  }

  let o = {

    'M+': date.getMonth() + 1,

    'd+': date.getDate(),

    'h+': date.getHours(),

    'm+': date.getMinutes(),

    's+': date.getSeconds()

  };

  for (let k in o) {

    if (new RegExp(`(${k})`).test(fmt)) {

      let str = o[k] + '';

      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));

    }

  }

  return fmt;

}

function padLeftZero (str) {

  return ('00' + str).substr(str.length);

}
