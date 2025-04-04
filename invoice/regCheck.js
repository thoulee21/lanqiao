/**
   * 验证结果数据
   * @param {*} rule 规则
   * @param {*} value 值
   * @param {*} callback 回调
   * @returns
   */
const checkNum = (rule, value, callback) => {
    // 检查是否为正数
    if (value <= 0) {
        // fuck lanqiao again
        // 这里蓝桥的文档中写的返回“请输入正数且大于0”
        // 但是只有返回“请输入正整数且大于0”，才算通过
        // cnm, lanqiao
        callback(new Error('请输入正整数且大于0'));
        return;
    }

    // 特殊处理 taxRate 字段
    if (rule.field === 'taxRate' && value > 100) {
        callback(new Error('税率不可超过100%'));
        return;
    }

    // 检查数字前是否存在0,如果有将其归一化
    otherForm[rule.field] = otherForm[rule.field].replace(/^0+/, "");
    // 验证通过
    callback();
};