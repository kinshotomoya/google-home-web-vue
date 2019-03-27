<template>
  <div id='app'>
    <HeaderTemp/>
    <LoadingOverlay v-show='loading' />
    <router-view v-show='!loading' />
  </div>
</template>

<script>
  import LoadingOverlay from './components/LoadingOverlay.vue'
  import HeaderTemp from './components/HeaderTemp.vue'
  import Content from './components/Content.vue'


  export default {
    name: 'MyApp',
    components: {
      HeaderTemp,
      Content,
      LoadingOverlay
    },
    computed: {
      loading() {
        return this.$store.state.loading
      }
    },
  }
</script>

<style lang="css">
</style>
