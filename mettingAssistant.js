function myAllSettled(promises) {
  return new Promise((resolve) => {
    const results = [];
    let completed = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = { status: 'fulfilled', value };
        })
        .catch(reason => {
          results[index] = { status: 'rejected', reason };
        })
        .finally(() => {
          completed += 1;
          if (completed === promises.length) {
            resolve(results);
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