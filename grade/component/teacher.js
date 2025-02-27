const teacher = {
    template: `
          <div id="top">
              <div class="top_info">
                  <!-- 需要替换为动态数据 -->
                  <span class="identity">{{ identityText }}</span> |
                  <!-- 需要补充代码 -->
                  <button class="logout" @click="logout">注销</button>
              </div>
          </div>
          <div id="task">
              <table border="1" cellpadding="10" cellspacing="0">
                  <thead>
                      <tr>
                          <th id="name">姓名</th>
                          <th id="chinese">语文</th>
                          <th id="math">数学</th>
                          <th id="english">英语</th>
                          <th id="operate">操作</th>
                      </tr>
                  </thead>
                  <tbody>
                      <!-- 需要替换为动态数据 -->
                      <tr v-for="(item, index) in students" :key="index">
                          <td>{{ item.master }}</td>
                          <td>
                              <input type="text" :disabled="!item.isEditing" v-model="item.chinese" class="chineseInput"/>
                          </td>
                          <td>
                              <input type="text" :disabled="!item.isEditing" v-model="item.math"/>
                          </td>
                          <td>
                              <input type="text" :disabled="!item.isEditing" v-model="item.english"/>
                          </td>
                          <td>
                              <button class="edit" @click="edit(index)">编辑</button>
                              <button class="success" @click="success(index)">确定</button>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
      `,
    setup() {
      const MockUrl = "./data/user.json"; // 数据请求地址
      const store = useDataStore(); // pinia 状态管理库
  
      const identityText = ref("");
      const students = ref([]);
  
      // 编辑函数
      const edit = (index) => {
        // TODO: 请补充代码
        students.value[index].isEditing = true;
  
        nextTick(() => {
          const stuRows = document.querySelectorAll("tbody tr");
          const cur = stuRows[index];
          const chineseInput = cur.querySelector(".chineseInput");
          chineseInput.focus();
        });
      };
  
      // 完成编辑函数
      const success = (index) => {
        store.studentData.push(students.value[index]);
        // 禁用输入框
        students.value[index].isEditing = false;
        console.log(store.studentData);
      };
  
      // 注销函数
      const logout = () => {
        // TODO: 请补充代码
        localStorage.clear();
        router.push("/login");
      };
  
      onMounted(() => {
        // TODO: 请补充代码
        const user = JSON.parse(localStorage.getItem("user"));
        identityText.value = `老师-${user.master}`;
  
        fetch(MockUrl)
          .then((resp) => resp.json())
          .then((res) => {
            students.value = res
              .filter((stu) => stu.type === 2)
              .map((stu) => {
                const ext = {
                  isEditing: false,
                  chinese: 0,
                  math: 0,
                  english: 0,
                };
  
                const stuExt = Object.assign(stu, ext);
                return stuExt;
              });
          });
      });
  
      return {
        identityText,
        students,
        edit,
        success,
        logout,
      };
    },
  };
  