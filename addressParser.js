const text = "15277775555 重庆市渝中区解放碑步行街99号 刘十二";

// 将输入字符串按空格分割为多个部分
const parts = text.split(' ');

// 匹配11位手机号
const phoneRegex = /\b\d{11}\b/;

// 匹配2-4个汉字的姓名
const nameRegex = /^[\u4e00-\u9fa5]{2,4}$/;

// 匹配中文开头，包含字母、数字、中文，长度在4位及以上的地址部分
const addressRegex = /^[\u4e00-\u9fa5][\u4e00-\u9fa5a-zA-Z0-9\s]{3,}$/;

let phone = '';
let name = '';
let addressParts = [];

// 遍历每个部分，分别识别电话号码、姓名和地址
parts.forEach(part => {
    if (phoneRegex.test(part)) {
        phone = part;
    } else if (nameRegex.test(part)) {
        name = part;
    } else if (addressRegex.test(part)) {
        addressParts.push(part);
    }
});

// 将地址部分合并为一个完整的地址字符串
let address = addressParts.join('');

const result = {
    phone: Number(phone),
    name,
    address
};

console.log(result);