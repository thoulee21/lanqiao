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
    const stuRank = ref(0);
    const stuTotal = ref(0);
    const chinese = ref(0);
    const math = ref(0);
    const english = ref(0);

    onMounted(() => {
      const loggedStu = JSON.parse(localStorage.getItem("user"));
      stuIdTxt.value = loggedStu.master;

      const studentsData = toRaw(store.studentData);
      const stuData = studentsData.find((stu) => stu.id === loggedStu.id);
      console.log(stuData);

      stuTotal.value =
        Number(stuData.chinese) +
        Number(stuData.math) +
        Number(stuData.english);

      //   let copyStudentData = [];
      //   studentsData.forEach((studentData) => {
      //     copyStudentData.push(studentData);
      //   });
      //   copyStudentData.sort(
      //     (a, b) =>
      //       Number(a.chinese) +
      //       Number(a.math) +
      //       Number(a.english) -
      //       (Number(b.chinese) + Number(b.math) + Number(b.english))
      //   );
      //   stuRank.value = copyStudentData.indexOf(stuData.value) + 1;
    });
    // TODO: END

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
