import Vue from "vue";
import Router from "vue-router";
import Main from "@/views/Main";
import Home from "@/views/Home";
import Article from "@/views/Article";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Main,
      children: [
        { path: "/", name: "home", component: Home },
        {
          path: "/articles/:id",
          name: "article",
          component: Article,
          props: true
        }
      ]
    }
  ]
});
