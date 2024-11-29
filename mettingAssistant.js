function myAllSettled(promises) {
  return new Promise(function (resolve, reject) {
    let res = [];

    promises.forEach(function (pro, index) {
      pro.then(function (value) {
        //不能用res.push({ status: 'success', value: value });
        //会导致res的顺序和promises的顺序不一致
        res[index] = { status: 'success', value: value };
      }).catch(function (reason) {
        res[index] = { status: 'failed', value: reason };
      }).finally(function () {
        if (res.length === promises.length) {
          if (res.filter(function (stat) {
            return stat.status === 'failed';
          }).length === res.length) {
            reject('all promises failed');
          }
          else { resolve(res); }
        }
      });
    });
  });
}

// 示例用法
const promises = [
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3)
];

myAllSettled(promises).then(results => {
  console.log(results);
  // 输出:
  // [
  //   { status: 'fulfilled', value: 1 },
  //   { status: 'rejected', reason: 'error' },
  //   { status: 'fulfilled', value: 3 }
  // ]
});