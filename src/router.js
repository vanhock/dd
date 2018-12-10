import Vue from "vue";
import Router from "vue-router";
import Contact from "./views/Contact";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "contact",
      component: Contact
    },
    {
      path: "/delivery",
      name: "delivery",
      component: () =>
        import(/* webpackChunkName: "delivery" */ "./views/Delivery")
    }
  ]
});
