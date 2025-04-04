/**
 * 数字生成繁体大写字
 * @param {number} num 亿级及以下数字，保留两位小数
 * @returns {string} 繁体大写字
 */
const toChineseNumber = (num) => {
    const map = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
    const units = ["", "拾", "佰", "仟"];
    const tens = ["", "万", "亿"];
    let result = "";

    //TODO 待补充代码
    const [integerPart, decimalPart] = num.toString().split('.');
    const parts = integerPart
        .replace(/(?=(\d{4})+$)/g, ',') // 每四位加一个逗号
        .split(',') // 分割成四位一组
        .filter(Boolean) // 过滤掉空字符串

    /**
     * 去除多余的零
     * @param {string} str 
     * @returns {string}
     */
    const handleZero = (str) => {
        return str.replace(/零+/g, "零").replace(/零+$/, "")
    }

    /**
     *
     * @param {string} part 
     * @returns {string}
     */
    const transform = (part) => {
        let res = ''

        for (let i = 0; i < part.length; i++) {
            const char = map[part[i]];
            let unit = units[part.length - i - 1]
            if (char === '零') {
                unit = ''
            }
            res += char + unit;
        }

        return handleZero(res)
    }

    for (let i = 0; i < parts.length; i++) {
        const c = transform(parts[i]);
        const u = tens[parts.length - i - 1]
        result += c + u;
    }

    result = handleZero(result) + '元'

    if (decimalPart && decimalPart !== '00') {
        const jiao = decimalPart[0] !== '0'
            ? map[decimalPart[0]] + '角'
            : '零'
        const fen = decimalPart[1] !== '0'
            ? map[decimalPart[1]] + '分'
            : ''

        result += jiao + fen
    } else {
        result += '整'
    }

    return result;
};
