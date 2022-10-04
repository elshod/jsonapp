<template>
  <div class="links">
    <router-link
    v-for="(link,index) of links"
    :key="index"
    :to="link.link">
    {{link.title}}
  </router-link>
  </div>
</template>
<script>
export default {
    data() { return {
        links: [
            {title:'Bosh sahifa',link:'/'},
            {title:'Bo`limlar',link:'/depart'},
            {title:'Yangiliklar',link:'/news'},
            {title:'Loyihalar',link:'/projects'}
        ]
    }},
}
</script>
<style>
.links { display: flex; justify-content: center; }
.links a { margin: 0px 10px; text-decoration: none; color: #000; }
.links a.router-link-active { text-decoration: underline; }
</style>