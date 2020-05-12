import Vue from "vue";
import App from "./App.vue";
import "./assets/scss/main.scss";
import "./assets/css/style.css";


new Vue({
    el: "#app",
    render: (h) => h(App),
});


let abc = () => {
    console.log("this is hahhahahahaha");
};

console.log(abc)