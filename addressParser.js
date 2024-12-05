function extractInfo(text) {
    // 定义正则表达式
    const phoneRegex = /\b\d{11}\b/; // 匹配11位数字
    const nameRegex = /^[\u4e00-\u9fa5]{2,4}$/; // 匹配2-4个汉字的姓名
    const addressRegex = /^[\u4e00-\u9fa5][\u4e00-\u9fa5a-zA-Z0-9\s]{3,}$/; // 匹配中文开头，包含字母、数字、中文，长度在4位及以上的地址部分

    // 将输入字符串按空格分割为多个部分
    const parts = text.split(' ');

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

    // 将地址部分合并为一个完整的地址字符串，并去除逗号
    let address = addressParts.join(' ').replace(/，/g, '').replace(/,/g, '');

    // 确保地址不包含姓名和电话
    if (address.includes(phone)) {
        address = address.replace(phone, '').trim();
    }
    if (address.includes(name)) {
        address = address.replace(name, '').trim();
    }

    return {
        name: name,
        phone: Number(phone),
        address: address
    };
}

// 测试用例
console.log(extractInfo("15277775555 重庆市渝中区解放碑步行街99号 刘十二"));
console.log(extractInfo("周八 15277775555 西湖7号"));
console.log(extractInfo("西湖7号 15012345678 周八"));
console.log(extractInfo("周八 15277775555 西湖7号，"));
console.log(extractInfo("15012345678 北京市海淀区中关村大街1号 张三"));
console.log(extractInfo("李四 13800138000 上海市浦东新区世纪大道100号"));
console.log(extractInfo("深圳市南山区科技园 13512345678 王五"));
console.log(extractInfo("王五 深圳市南山区科技园 13512345678"));
console.log(extractInfo("13512345678 王五 深圳市南山区科技园"));
console.log(extractInfo("深圳市南山区科技园 王五 13512345678"));