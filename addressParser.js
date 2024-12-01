const input = "刘十二 重庆市渝中区解放碑步行街99号 15277775555";

// 匹配11位手机号（不限制位置）
const phoneRegex = /1\d{10}/;

// 匹配2-4个汉字的姓名（开头或中间位置）
const nameRegex = /(^[\u4e00-\u9fa5]{2,4})|(\s[\u4e00-\u9fa5]{2,4}\s)/;

// 匹配包含汉字和数字的地址部分
const addressRegex = /([\u4e00-\u9fa5]+区[\u4e00-\u9fa5]+[路街巷][\d号室]+)/;

// 提取信息
const phoneNumber = input.match(phoneRegex)?.[0];
const name = input.match(nameRegex)?.[1] || input.match(nameRegex)?.[2]?.trim();
const address = input.match(addressRegex)?.[1];

const result = {
    phoneNumber: Number(phoneNumber),
    name,
    address
}

console.log(result);