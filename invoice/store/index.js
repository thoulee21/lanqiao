const { defineStore } = Pinia;
const { ref, reactive } = Vue;

//信息store
const useMessageStore = defineStore("message", () => {
  const currentIndex = ref(1);
  // 企业信息
  const corporationForm = reactive({
    corporationName: "",
    corporationAdress: "",
    corporationPhone: "",
    corporationBank: "",
    corporationAccount: "",
  });

  // 客户信息
  const clientForm = reactive({
    clientName: "",
    clientAdress: "",
    clientPhone: "",
    clientBank: "",
    clientAccount: "",
  });

  // 商品信息&其他信息
  const otherForm = reactive({
    product: "",
    price: 0,
    quantity: 0,
    taxRate: 0,
    payee: "",
    recheck: "",
    drawer: "",
    date: "",
    remark: "",
  });

  // 切换步骤
  const setCurrentIndex = (index) => {
    currentIndex.value = index;
  };

  //清空表单
  const reset = () => {
    currentIndex.value = 1;
    corporationForm = {
      corporationName: "",
      corporationAddress: "",
      corporationPhone: "",
      corporationBank: "",
      corporationAccount: "",
    };
    clientForm = {
      clientName: "",
      clientAddress: "",
      clientPhone: "",
      clientBank: "",
      clientAccount: "",
    };
    otherForm = {
      product: "",
      price: 0,
      quantity: 0,
      taxRate: 0,
      payee: "",
      recheck: "",
      drawer: "",
      date: "",
      remark: "",
    };
  };
  /**
   * 数字生成繁体大写字
   * @param {number} num 亿级及以下数字，保留两位小数
   * @returns {string} 繁体大写字
   */

  const toChineseNumer = (num) => {
    const number = num;
    const type = "upper";

    const configs = {
      lower: {
        num: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
        unit: ["", "十", "百", "千", "万"],
        level: ["", "万", "亿"],
      },
      upper: {
        num: ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"],
        unit: ["", "拾", "佰", "仟"],
        level: ["", "万", "亿"],
      },
      decimal: {
        unit: ["分", "角"],
      },
      maxNumber: 999999999999.99,
    };
    // 过滤不合法参数
    if (Number(number) > configs.maxNumber) {
      console.error(
        `The maxNumber is ${configs.maxNumber}. ${number} is bigger than it!`
      );
      return false;
    }
    const conf = configs[type];
    const numbers = String(Number(number).toFixed(2)).split(".");
    const integer = numbers[0].split("");
    const decimal = Number(numbers[1]) === 0 ? [] : numbers[1].split("");
    // 四位分级
    const levels = integer.reverse().reduce((pre, item, idx) => {
      let level = pre[0] && pre[0].length < 4 ? pre[0] : [];
      let value =
        item === "0" ? conf.num[item] : conf.num[item] + conf.unit[idx % 4];
      level.unshift(value);
      if (level.length === 1) {
        pre.unshift(level);
      } else {
        pre[0] = level;
      }
      return pre;
    }, []);
    // 整数部分
    const _integer = levels.reduce((pre, item, idx) => {
      let _level = conf.level[levels.length - idx - 1];
      let _item = item.join("").replace(/(零)\1+/g, "$1"); // 连续多个零字的部分设置为单个零字
      // 如果这一级只有一个零字，则去掉这级
      if (_item === "零") {
        _item = "";
        _level = "";
        // 否则如果末尾为零字，则去掉这个零字
      } else if (_item[_item.length - 1] === "零") {
        _item = _item.slice(0, _item.length - 1);
      }
      return pre + _item + _level;
    }, "");
    // 小数部分
    let _decimal = decimal
      .map((item, idx) => {
        const unit = configs.decimal.unit;
        const _unit = item !== "0" ? unit[unit.length - idx - 1] : "";
        return `${conf.num[item]}${_unit}`;
      })
      .join("");
    if (_decimal[_decimal.length - 1] === "零") {
      _decimal = _decimal.slice(0, _decimal.length - 1);
    }
    // 如果是整数，则补个整字
    return `${_integer}元` + (_decimal || "整");
  };

  /**
   * 基础信息加密
   * @param {string} data 需要加密的数据 (基础信息拼接起来的字符串)
   * @returns {string} 加密后的数据
   */
  const Encrypt = (data) => {
    // 密钥
    var key = CryptoJS.enc.Utf8.parse("key"); // 16 字节密钥
    // IV（可选）
    var iv = CryptoJS.enc.Utf8.parse("iv"); // 16 字节 IV
    // 加密
    var encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    var ciphertext = encrypted.toString();
    return ciphertext;
  };

  /**
   * 整合发票所需要的数据
   * @returns {Object} 整合好的发票数据
   */

  const invoiceForm = () => {
    //TODO 待补充代码
    const amount = Number(otherForm.price * otherForm.quantity).toFixed(2);
    const payable = Number(amount * (0.01 * otherForm.taxRate)).toFixed(2);
    const number = Number(Number(amount) + Number(payable)).toFixed(2);

    const character = toChineseNumer(amount);
    const passwd = Encrypt(
      corporationForm.corporationName +
        corporationForm.corporationAdress +
        clientForm.clientName +
        clientForm.clientAdress
    );

    const res = {
      amount: amount,
      character: character,
      clientAccount: clientForm.clientAccount,
      clientAdress: clientForm.clientAdress,
      clientBank: clientForm.clientBank,
      clientName: clientForm.clientName,
      clientPhone: clientForm.clientPhone,
      corporationAccount: corporationForm.corporationAccount,
      corporationAdress: corporationForm.corporationAdress,
      corporationBank: corporationForm.corporationBank,
      corporationName: corporationForm.corporationName,
      corporationPhone: corporationForm.corporationPhone,
      date: otherForm.date,
      drawer: otherForm.drawer,
      payee: otherForm.payee,
      price: otherForm.price,
      product: otherForm.product,
      quantity: otherForm.quantity,
      recheck: otherForm.recheck,
      remark: otherForm.remark,
      taxRate: otherForm.taxRate,
      password: passwd,
      payable: payable,
      number: number,
    };

    return res;
  };

  return {
    currentIndex,
    setCurrentIndex,
    corporationForm,
    clientForm,
    otherForm,
    invoiceForm,
    reset,
    toChineseNumer,
  };
});

//校验store
const useCheckStore = defineStore("check", () => {
  const { otherForm } = useMessageStore();

  /**
   * 校验手机号
   * @param {*} rule 规则
   * @param {*} value 值
   * @param {*} callback 回调
   * @returns
   */
  const checkPhone = (rule, value, callback) => {
    // TODO：待补充代码
    if (/^1[3-9]\d{9}$/.test(value)) {
      callback();
    } else {
      callback(new Error("请输入正确的手机号码"));
    }
  };

  /**
   * 验证账号
   * @param {*} rule 规则
   * @param {*} value 值
   * @param {*} callback 回调
   */
  const checkAccount = (rule, value, callback) => {
    // TODO：待补充代码
    if (/^\d{18}$/.test(value)) {
      callback();
    } else {
      callback(new Error("请输入正确的18位账户号码"));
    }
  };

  /**
   * 验证结果数据
   * @param {*} rule 规则
   * @param {*} value 值
   * @param {*} callback 回调
   * @returns
   */
  const checkNum = (rule, value, callback) => {
    // TODO：待补充代码
    
    //检查数字前是否存在0,如果有将其归一化
    otherForm[rule.field] = otherForm[rule.field].replace(/^0+/, "");
    
    value = Number(value);

    // 检查是否为正数
    if (value <= 0) {
      callback(new Error("请输入正数且大于0"));
      return;
    }

    // 特殊处理 taxRate 字段
    if (rule.field === "taxRate" && value > 100) {
      callback(new Error("税率不可超过100%"));
      return;
    }

    callback();
  };
  return {
    checkPhone,
    checkAccount,
    checkNum,
  };
});
