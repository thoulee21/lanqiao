const now = new Date();
const raw = now.getMonth() + 1
const month = raw < 10 ? `0${raw}` : raw;
console.log(now.toLocaleString('zh-CN', { hour12: false }));

let list = [0, 2, 4, 6, 8, 10];
// 过滤出符合条件（callback返回值为true）的元素
list = list.filter((item) => item > 5); // 条件为真时，保留，即保留大于5的元素
console.log(list);