<template>
  <div id="app">
    <nav-bar />
    <router-view />
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import NavBar from "./components/NavBar";
export default {
  components: {
    NavBar
  }
};
</script>
