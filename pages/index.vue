<template>
    <div id="home" @scroll="scroll" style="height: 1000px">
        <main>
            <input
                type="text"
                id="input"
                v-model="text"
                v-debounce="{
                    event: 'input',
                    handle: changeEv,
                    wait: 500,
                }"
            />
        </main>
        <ul
            class="uls"
            v-if="show"
            v-delegation="{
                handle: changeEv,
                nodeClass: 'item',
            }"
        >
            <li class="item" v-for="(item, index) in arr" :key="index">
                {{ item }}
            </li>
        </ul>
        <button @click="add">add</button>
        <button @click="remove">remove</button>
        <router-link to="/rule">gotorule</router-link>
    </div>
</template>

<script>
import throttle from "../tool/event";
export default {
    data() {
        return {
            text: "",
            arr: [1, 2, 3, 4],
            show: true,
        };
    },
    mounted() {
        window.addEventListener("scroll", throttle(this.scroll, 100), false);
    },
    methods: {
        changeEv(e) {
            console.log(e);
        },
        add() {
            this.show = true;
        },
        remove() {
            this.show = false;
        },
        scroll() {
            console.log(12);
        },
    },
    watch: {
        text: function() {},
    },
};
</script>
