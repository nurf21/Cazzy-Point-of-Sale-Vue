<template>
  <b-row>
    <b-col cols="2" class="header-icon">
      <img src="@/assets/img/menu.png" alt="toggle-menu" v-b-toggle.sidebar-backdrop />
    </b-col>
    <b-col cols="8" class="header-text">
      <h1>{{text}}</h1>
    </b-col>
    <b-col cols="2"></b-col>
  </b-row>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style scoped>
.header-icon {
  margin: 33px auto;
}

.header-text {
  margin: auto;
  text-align: center;
}

.header-text h1 {
  font-size: 30px;
  margin: 0;
}

*:focus {
  outline: none;
}
</style>
