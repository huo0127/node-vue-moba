// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

import VueAwesomeSwiper from "vue-awesome-swiper";

// import style (<= Swiper 5.x)
import "swiper/css/swiper.css";
Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;

import "./assets/iconfont/iconfont.css";
import "./assets/scss/style.scss";

import Card from "./components/Card.vue";
Vue.component("m-card", Card);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
