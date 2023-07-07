<template>
  <div id="wrapper">
    <NavBar />
    <section class="section is-medium">
      <router-view />
    </section>

    <footer class="footer">
      <p class="has-text-centered">Copyright (c) 2023</p>
    </footer>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
export default {
    components: {
      NavBar
    }
};
</script>

<style lang="scss">
@import "../node_modules/bulma";

.section {
  max-width: 1200px;
  margin: auto;
}
</style>
