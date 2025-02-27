const { createRouter, createWebHistory } = VueRouter;

// 路由规则
const routes = [
  {
    path: "/login",
    component: login,
  },
  {
    path: "/teacher",
    meta: {
      isAuth: true,
    },
    component: teacher,
  },
  {
    path: "/student",
    meta: {
      isAuth: true,
    },
    component: student,
  },
];

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// TODO: 请补充代码
router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      next();
    } catch {
      next("/login");
    }
  } else {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.type === 1) {
        next("/teacher");
      } else {
        next("/student");
      }
    } catch {
      next();
    }
  }
});
// TODO: END
