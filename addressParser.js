const text = "周八 15277775555 西湖7号，";

// 清理字符串末尾的标点符号，并按空格分割
const parts = text.replace(/[，。、；,.;]$/, '').split(' ');

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