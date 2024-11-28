const input = "15277775555 重庆市渝中区解放碑步行街99号 刘十二";

const phoneRegex = /\b\d{11}\b/;
const nameRegex = /[\u4e00-\u9fa5]{2,}$/;
const addressRegex = /\b\d{11}\b\s([\u4e00-\u9fa5\s\d]+)\s[\u4e00-\u9fa5]{2,}$/;

const phoneNumber = input.match(phoneRegex);
const name = input.match(nameRegex);
const address = input.match(addressRegex);

console.log(`电话号码: ${phoneNumber ? phoneNumber[0] : "未找到"}`);
console.log(`地址: ${address ? address[1] : "未找到"}`);
console.log(`姓名: ${name ? name[0] : "未找到"}`);