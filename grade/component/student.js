const student = {
  template: `
          <div id="top">
              <div class="top_info">
                  <!-- 需要替换为动态数据 -->
                  <span class="identity">学生-{{ stuIdTxt }}</span> |
                  <!-- 需要补充代码 -->
                  <button class="logout" @click="logout">注销</button>
              </div>
          </div>
          <div id="score">
              <!-- 需要替换为动态数据 -->
              <div id="master">
                  {{ stuIdTxt }}的成绩如下：
              </div>
              <div id="table_header">
                  <span>科目</span>
                  <span>成绩</span>
              </div>
              <div id="subject">
                  <!-- 需要替换为动态数据 -->
                  <div class="subject_item">
                      <span>语文</span>
                      <span>{{ chinese }}</span>
                  </div>
                  <div class="subject_item">
                      <span>数学</span>
                      <span>{{ math }}</span>
                  </div>
                  <div class="subject_item">
                      <span>英语</span>
                      <span>{{ english }}</span>
                  </div>
                  <div class="total">
                      <span>总分</span>
                      <span>{{ stuTotal }}</span>
                  </div>
                  <div class="rank">
                      <span>排名</span>
                      <span>{{ stuRank }}</span>
                  </div>
              </div>
          </div>
      `,
  setup() {
    const store = useDataStore(); // pinia 状态管理库

    // TODO: 请补充代码
    const { toRaw } = Vue;

    const stuIdTxt = ref("");
    const stuRank = ref(""); // 改为空字符串以便处理无成绩情况
    const stuTotal = ref(""); // 改为空字符串以便处理无成绩情况
    const chinese = ref("");
    const math = ref("");
    const english = ref("");

    onMounted(() => {
      // 注意缓存问题，/teacher 页面不会随/student 页面刷新而更新数据
      // 蓝桥官方题解是用computed来处理的


      // 获取当前登录的学生信息
      const loggedStu = JSON.parse(localStorage.getItem("user"));
      stuIdTxt.value = loggedStu.master;

      // 获取所有学生数据
      const studentsData = toRaw(store.studentData);

      // 查找当前学生的成绩数据
      const stuData = studentsData.find((stu) => stu.id === loggedStu.id);

      // 如果找到了学生数据，则填充成绩
      if (stuData) {
        // 设置各科成绩，如果没有成绩则保持为空字符串
        chinese.value = stuData.chinese || "";
        math.value = stuData.math || "";
        english.value = stuData.english || "";

        // 检查是否三科都没有成绩
        const allSubjectsEmpty =
          (!stuData.chinese || stuData.chinese === "") &&
          (!stuData.math || stuData.math === "") &&
          (!stuData.english || stuData.english === "");

        // 只要有任何一门课有成绩，就计算总分与排名
        if (!allSubjectsEmpty) {
          // 计算总分（将没有成绩的科目视为0分）
          const chineseScore = stuData.chinese ? Number(stuData.chinese) : 0;
          const mathScore = stuData.math ? Number(stuData.math) : 0;
          const englishScore = stuData.english ? Number(stuData.english) : 0;

          stuTotal.value = chineseScore + mathScore + englishScore;

          // 计算排名
          // 复制学生数据进行排序，排除所有科目都空的学生
          //   let studentRankList = [...studentsData].filter(
          //     (s) => s.chinese || s.math || s.english
          //   );
          const studentRankList = studentsData;

          // 为每个学生计算总分
          studentRankList.forEach((s) => {
            const chinese = s.chinese ? Number(s.chinese) : 0;
            const math = s.math ? Number(s.math) : 0;
            const english = s.english ? Number(s.english) : 0;
            s.total = chinese + math + english;
          });

          // 按总分降序排序
          studentRankList.sort((a, b) => b.total - a.total);

          // 找到当前学生的排名
          const rank =
            studentRankList.findIndex((s) => s.id === loggedStu.id) + 1;
          stuRank.value = rank > 0 ? rank : "";
        } else {
          // 三科都没有成绩时，总分和排名显示为空
          stuTotal.value = "";
          stuRank.value = "";
        }
      }
    });

    // 注销函数
    const logout = () => {
      // TODO: 请补充代码
      localStorage.clear();
      router.push("/login");
    };

    return {
      stuIdTxt,
      stuTotal,
      stuRank,
      chinese,
      math,
      english,
      logout,
    };
  },
};
