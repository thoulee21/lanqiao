const Invoice = {
    template: `
    <div class="header">
          <div class="ma" @click="messageStore.reset">机器编号:13123123123131</div>
          <div class="center">XX增值税电子普通发票</div>
          <div class="right">
            <div class="dai">发票代码: 313124233131</div>
            <div class="hao">发票号码: 22645674</div>
            <div class="date v1">开票日期: {{data.date}}</div>
            <div class="check">校验码: 2423525235363636</div>
          </div>
        </div>
        <div class="heart">
          <div class="buy">
            <div class="buy-title">
              <p>购</p>
              <p>买</p>
              <p>方</p>
            </div>
            <div class="buy-title-message">
              <div class="name">
                <p>名称：</p>
                <p class="msg v2">{{data.corporationName}}</p>
              </div>
              <div class="adress">
                <p>地址：</p>
                <p class="msg v3">{{data.corporationAdress}}</p>
              </div>
              <div class="phone">
                <p>电话：</p>
                <p class="msg v4">{{data.corporationPhone}}</p>
              </div>
              <div class="accout">
                <p>开户行及账号：</p>
                <p class="msg v5">{{data.corporationBank}}/{{data.corporationAccount}}</p>
              </div>
            </div>
            <div class="buy-password">
              <p>密</p>
              <p>码</p>
              <p>区</p>
            </div>
            <div class="buy-password-message v6">
              <p>{{data.password}}</p>
            </div>
          </div>
          <div class="other">
            <div class="cargo">
              <p>货物或应税劳务、服务名称</p>
              <p class="msg v7">
                {{data.product}}
              </p>
              <p class="total">合&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;计</p>
            </div>
            <div class="specification">
              <p>规格型号</p>
            </div>
            <div class="unit">
              <p>单位</p>
            </div>
            <div class="num">
              <p>数量</p>
              <p class="msg v8">{{data.quantity}}</p>
            </div>
            <div class="price">
              <p>单价</p>
              <p class="msg v9">{{data.price}}</p>
            </div>
            <div class="amount">
              <p>金额</p>
              <p class="msg v10">{{data.amount}}</p>
              <p class="amount-total">￥{{data.amount}}</p>
            </div>
            <div class="taxrate">
              <p>税率</p>
              <p class="msg v11">{{data.taxRate}}%</p>
            </div>
            <div class="payable">
              <p>税额</p>
              <p class="msg v12">{{data.payable}}</p>
              <div class="payable-total">￥{{data.payable}}</div>
            </div>
          </div>
          <div class="number">
            <div class="up">
              价税合计（大写）
            </div>
            <div class="up-num v13"><img src="./images/icon.svg" alt="" >{{data.character}}</div>
            <div class="low">（小写）</div>
            <div class="low-num v14" >￥{{data.number}}</div>
          </div>
          <div class="buy">
            <div class="buy-title">
              <p>销</p>
              <p>售</p>
              <p>方</p>
            </div>
            <div class="buy-title-message">
              <div class="name">
                <p>名称：</p>
                <p class="msg v15">{{data.clientName}}</p>
              </div>
              <div class="adress">
                <p>地址：</p>
                <p class="msg v16">{{data.clientAdress}}</p>
              </div>
              <div class="phone">
                <p>电话：</p>
                <p class="msg v17">{{data.clientPhone}}</p>
              </div>
              <div class="accout">
                <p>开户行及账号：</p>
                <p class="msg v18">{{data.clientBank}}/{{data.clientAccount}}</p>
              </div>
            </div>
            <div class="buy-password">
              <p>备</p>
              <p>注</p>
            </div>
            <div class="buy-password-message">
              <p class="v19">{{data.remark}}</p>
            </div>
          </div>
        </div>
  
        <div class="fotter">
          <div class="payee">
            <p>收款人：</p>
            <p class="msg v20">{{data.payee}}</p>
          </div>
          <div class="reviewer">
            <p>复核人：</p>
            <p class="msg v21">{{data.recheck}}</p>
          </div>
          <div class="drawer">
            <p>开票人：</p>
            <p class="msg v22">{{data.drawer}}</p>
          </div>
          <div class="seal">
            <p>销售方（章）：</p>
            <p class="msg">XXX</p>
          </div>
        </div>  
    `,
    setup() {
        const { ref } = Vue;
        const data = ref({});
        const messageStore = useMessageStore(); // 引入 store
        //TODO:待补充代码
        const invoice = messageStore.invoiceForm();
        data.value = invoice;

        return { data, messageStore };
    },
};
