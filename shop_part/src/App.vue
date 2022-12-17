<template>
  <!-- 根app -->
  <div id="app">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
    import Index from '@/view/Index.vue'
    import UserMessage from '@/view/info/UserMessage.vue';
    export default {
        name: 'App',
        components:{
          Index,
          UserMessage
        },
    }
</script>

<style style="less">
  #app{
    height: 100%;
  }
</style>
