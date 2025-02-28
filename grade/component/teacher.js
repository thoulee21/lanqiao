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
        const studentData = students.value[index];
        
        // 检查当前学生是否已存在于store中
        const existingIndex = store.studentData.findIndex(item => item.master === studentData.master);
        
        if (existingIndex !== -1) {
          // 如果学生已存在，更新成绩
          store.studentData[existingIndex].chinese = studentData.chinese;
          store.studentData[existingIndex].math = studentData.math;
          store.studentData[existingIndex].english = studentData.english;
        } else {
          // 如果学生不存在，添加到store中
          // 创建一个新对象，只包含需要的属性
          const newStudentData = {
            id: studentData.id,
            master: studentData.master,
            chinese: studentData.chinese,
            math: studentData.math,
            english: studentData.english
          };
          store.studentData.push(newStudentData);
        }
        
        // 禁用编辑模式
        students.value[index].isEditing = false;
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
