import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import "./assets/scss/main.scss";
// import "./assets/css/style.css";
import event from "./tool/event";

// Vue.mixin(event);

new Vue({
    el: "#app",
    router,
    render: (h) => h(App),
});
