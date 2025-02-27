/**
   * 验证结果数据
   * @param {*} rule 规则
   * @param {*} value 值
   * @param {*} callback 回调
   * @returns
   */
const checkNum = (rule, value, callback) => {
    if (typeof value !== 'number' || isNaN(value)) {
        callback(new Error('请输入有效数字'));
        return;
    }

    // 检查是否为正数
    if (value <= 0) {
        callback(new Error('请输入正数且大于0'));
        return;
    }

    // 特殊处理 taxRate 字段
    if (rule.field === 'taxRate' && value > 100) {
        callback(new Error('税率不可超过100%'));
        return;
    }

    // 验证通过
    callback();

    //检查数字前是否存在0,如果有将其归一化
    otherForm[rule.field] = otherForm[rule.field].replace(/^0+/, "");
};