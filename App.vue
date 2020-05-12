<template>
    <div class="root">
        <header>this is head</header>
        <main><img :src="img" alt=""></main>
        <footer>this is footer</footer>
    </div>
</template>

<script>
import image from "./assets/image/test.png"
export default {
    data() {
        return {
            img: image
        };
    },
    mounted() {},
};
</script>

<style lang="scss">
body {
    background-color: cadetblue;
}
</style>
