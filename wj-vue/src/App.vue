<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
    <router-view v-if="isRouterAlive"></router-view>
<!--    <router-view/>-->
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  created () {
    if (this.$store.state.userName !== '') {
      this.$global.initWebSocket()
    }
  },
  destroyed () {
    this.$global.webSocket.close()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}

html, body, #app{
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
