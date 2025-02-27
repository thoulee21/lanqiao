const student = {
    template: `
          <div id="top">
              <div class="top_info">
                  <!-- 需要替换为动态数据 -->
                  <span class="identity">{{ stuIdentityText }}</span> |
                  <!-- 需要补充代码 -->
                  <button class="logout" @click="logout">注销</button>
              </div>
          </div>
          <div id="score">
              <!-- 需要替换为动态数据 -->
              <div id="master">
                  {{ stuUserData.master }}的成绩如下：
              </div>
              <div id="table_header">
                  <span>科目</span>
                  <span>成绩</span>
              </div>
              <div id="subject">
                  <!-- 需要替换为动态数据 -->
                  <div class="subject_item">
                      <span>语文</span>
                      <span>{{ stuUserData.chinese }}</span>
                  </div>
                  <div class="subject_item">
                      <span>数学</span>
                      <span>{{ stuUserData.math }}</span>
                  </div>
                  <div class="subject_item">
                      <span>英语</span>
                      <span>{{ stuUserData.english }}</span>
                  </div>
                  <div class="total">
                      <span>总分</span>
                      <span>{{ total }}</span>
                  </div>
                  <div class="rank">
                      <span>排名</span>
                      <span>{{ rank }}</span>
                  </div>
              </div>
          </div>
      `,
    setup() {
      const store = useDataStore(); // pinia 状态管理库
  
      // TODO: 请补充代码
      const stuUserData = ref();
      const stuIdentityText = ref("");
      const total = ref(0);
      const rank = ref(0);
  
      onMounted(() => {
        const user = JSON.parse(localStorage.getItem("user"));
  
        stuIdentityText.value = `学生-${user.master}`;
        stuUserData.value = store.value.studentData.find(
          (stu) => stu.id === user.id
        );
  
        total.value =
          stuUserData.value.chinese +
          stuUserData.value.math +
          stuUserData.value.english;
  
        const studentData = store.value.studentData.sort(
          (a, b) =>
            a.chinese + a.math + a.english - (b.chinese + b.math + b.english)
        );
        rank.value = studentData.indexOf(stuUserData.value);
      });
      // TODO: END
  
      // 注销函数
      const logout = () => {
        // TODO: 请补充代码
        localStorage.clear();
        router.push("/login");
      };
  
      return {
        stuUserData,
        stuIdentityText,
        rank,
        logout,
      };
    },
  };
  