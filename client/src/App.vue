<template>
  <div id="app">
    <v-app>
      <page-header />

      <main>
          <router-view></router-view>
      </main>
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* background-color: #CFD8DC; */
  background: url('https://wallpaperaccess.com/full/1378098.jpg') no-repeat center center fixed !important;
  background-size: cover;
}
</style>
