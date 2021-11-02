import Vue from "vue";
import Router from "vue-router";
import Main from "@/views/Main";
import Home from "@/views/Home";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "main",
      component: Main,
      children: [{ path: "/", name: "home", component: Home }]
    }
  ]
});
