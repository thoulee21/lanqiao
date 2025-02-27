/**
   * 数字生成繁体大写字
   * @param {string} num 亿级及以下数字，保留两位小数
   * @returns {string} 繁体大写字
   */
const toChineseNumber = (num) => {
    const number = num
    const type = 'upper'

    const configs = {
        lower: {
            num: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
            unit: ['', '十', '百', '千', '万'],
            level: ['', '万', '亿']
        },
        upper: {
            num: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'],
            unit: ['', '拾', '佰', '仟'],
            level: ['', '万', '亿']
        },
        decimal: {
            unit: ['分', '角']
        },
        maxNumber: 999999999999.99
    }
    // 过滤不合法参数
    if (Number(number) > configs.maxNumber) {
        console.error(`The maxNumber is ${configs.maxNumber}. ${number} is bigger than it!`)
        return false
    }
    const conf = configs[type]
    const numbers = String(Number(number).toFixed(2)).split('.')
    const integer = numbers[0].split('')
    const decimal = Number(numbers[1]) === 0 ? [] : numbers[1].split('')
    // 四位分级
    const levels = integer.reverse().reduce((pre, item, idx) => {
        let level = pre[0] && pre[0].length < 4 ? pre[0] : []
        let value = item === '0' ? conf.num[item] : conf.num[item] + conf.unit[idx % 4]
        level.unshift(value)
        if (level.length === 1) {
            pre.unshift(level)
        } else {
            pre[0] = level
        }
        return pre
    }, [])
    // 整数部分
    const _integer = levels.reduce((pre, item, idx) => {
        let _level = conf.level[levels.length - idx - 1]
        let _item = item.join('').replace(/(零)\1+/g, '$1') // 连续多个零字的部分设置为单个零字
        // 如果这一级只有一个零字，则去掉这级
        if (_item === '零') {
            _item = ''
            _level = ''
            // 否则如果末尾为零字，则去掉这个零字
        } else if (_item[_item.length - 1] === '零') {
            _item = _item.slice(0, _item.length - 1)
        }
        return pre + _item + _level
    }, '')
    // 小数部分
    let _decimal = decimal
        .map((item, idx) => {
            const unit = configs.decimal.unit
            const _unit = item !== '0' ? unit[unit.length - idx - 1] : ''
            return `${conf.num[item]}${_unit}`
        })
        .join('')
    if (_decimal[_decimal.length - 1] === '零') {
        _decimal = _decimal.slice(0, _decimal.length - 1)
    }
    // 如果是整数，则补个整字
    return `${_integer}元` + (_decimal || '整')
};

console.log(toChineseNumber("100.0")); //壹佰元整
console.log(toChineseNumber("20.2")); //贰拾元贰角
console.log(toChineseNumber("12345.56")); //壹万贰仟叁佰肆拾伍元伍角陆分
console.log(toChineseNumber("123456789.01")); //壹亿贰仟叁佰肆拾伍万陆仟柒佰捌拾玖元零壹分
console.log(toChineseNumber("10000300.56")); // 壹仟万零叁佰元伍角陆分
console.assert(toChineseNumber("100.0") === "壹佰元整", "toChineseNumber: case 1");
console.assert(toChineseNumber("20.2") === "贰拾元贰角", "toChineseNumber: case 2");
console.assert(toChineseNumber("12345.56") === "壹万贰仟叁佰肆拾伍元伍角陆分", "toChineseNumber: case 3");
console.assert(toChineseNumber("123456789.01") === "壹亿贰仟叁佰肆拾伍万陆仟柒佰捌拾玖元零壹分", "toChineseNumber: case 4");
console.assert(toChineseNumber("10000300.56") === "壹仟万零叁佰元伍角陆分", "toChineseNumber: case 5");
