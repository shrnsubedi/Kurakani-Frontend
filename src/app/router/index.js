import Vue from "vue";
import VueRouter from "vue-router";
import PostList from "../components/post/PostList.vue";
import Login from "../components/login/LoginBox.vue";
import HomePage from "../components/home/HomePage.vue";
import PostItem from "../components/post/PostItem.vue";
import NewItem from "../components/post/NewItem.vue";
import EditItem from "../components/post/EditItem.vue";
import Register from "../components/login/Register.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/posts",
      component: PostList,
    },
    {
      path: "/posts/:id",
      component: PostItem,
      props: true,
    },
    {
      path: "/posts/:id/edit",
      component: EditItem,
      props: true,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");
        if (!token) next("/login");
        else next();
      },
    },
    {
      path: "/new",
      component: NewItem,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");
        if (!token) next("/login");
        else next();
      },
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/",
      component: HomePage,
    },
  ],
});

export default router;
