import Vue from "vue";
import Router from "vue-router";
import Index from "../pages/index.vue";
import Rule from "../pages/rule.vue";

Vue.use(Router);

const router = new Router({
    routes: [
        { path: "/", name: "index", component: Index },
        { path: "/rule", name: "rule", component: Rule },
    ],
});

export default router;
