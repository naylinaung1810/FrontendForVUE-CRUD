<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
  import router from './router'
  import NavBar from './components/NavBar'

export default {
  name: 'app',
  router,
  components: {
    NavBar
  }
}
</script>


