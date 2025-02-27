const login = {
    template: `
          <div id="login">
              <div id="title">
                  <h2>登录</h2>
              </div>
              <div id="user-input">
                  <form>
                      <div id="user-info">
                          <!-- 需要补充代码 -->
                          <input type="text" placeholder="请输入账号" id="amount" name="amount" autocomplete>
                          <input type="password" placeholder="请输入密码" id="password" name="password" autocomplete>
                      </div>
                      <div id="btn">
                          <!-- 需要补充代码 -->
                          <button id="login-btn" type="button" @click=login>登录</button>
                      </div>
                  </form>
              </div>
          </div> 
      `,
    setup() {
        const MockUrl = "./data/user.json"; // 数据请求地址
        const userData = ref(null); // 用户数据

        // 登录函数
        const login = () => {
            // TODO: 请补充代码
            userData.value.forEach((user) => {
                if (user.amount === amount.value && user.password === password.value) {
                    localStorage.setItem("user", JSON.stringify(user));
                    if (user.type === 1) {
                        router.push("/teacher");
                    } else {
                        router.push("/student");
                    }
                }
            });
        };

        onMounted(() => {
            // TODO: 请补充代码
            fetch(MockUrl)
                .then((resp) => resp.json())
                .then((res) => {
                    userData.value = res;
                });
        });

        return {
            login,
        };
    },
};
