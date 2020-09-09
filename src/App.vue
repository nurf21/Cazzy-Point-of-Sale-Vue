<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions(['interceptorRequest', 'interceptorResponse'])
  },
  created() {
    this.interceptorRequest()
    this.interceptorResponse()
  }
}
</script>

<style>
@font-face {
  font-family: 'Airbnb Cereal App';
  src: url(./assets/font/AirbnbCerealBook.ttf);
}

#app {
  font-family: Airbnb Cereal App, Helvetica, Arial, sans-serif;
}
</style>
