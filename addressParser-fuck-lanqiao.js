//https://www.lanqiao.cn/problems/19895/learning/?contest_id=227
//本题样例给出的是name:string phone:number address:string
//但是实际上返回name:string phone:string address:string蓝桥的系统才给通过
//所以这里的parser函数返回的phone是string类型
//fuck 蓝桥

const parser = (text) => {
    let res = {
        name: '',
        phone: 0,
        address: '',
    }

    const nameReg = /^[\u4e00-\u9fa5]{2,4}$/g;
    const phoneReg = /^\d{11}$/;
    const addressReg = /^[\u4e00-\u9fa5]+[\u4e00-\u9fa5a-zA-Z0-9]{3,}$/;

    const parts = text.trim().split(' ');
    parts.forEach((part) => {
        if (nameReg.test(part)) {
            res.name = part;
            return;
        }
        if (phoneReg.test(part)) {
            res.phone = part
            return;
        }
        if (addressReg.test(part)) {
            res.address = part
            return;
        }
    })
    return res;
}

console.log(parser("15277775555 重庆市渝中区解放碑步行街99号 刘十二"));