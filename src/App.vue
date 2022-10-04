<template>
  <HeaderItem/>
  <router-view/>
</template>

<script>
import HeaderItem from "./components/HeaderItem.vue";
// npm install vue-router@4

export default {
    name: "App",
    components: { HeaderItem }
}
</script>

<style>

</style>
