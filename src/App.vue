<template>
  <div id="wrapper">
    <NavBar />
    <div class="bg">
      <section class="section is-medium">
        <router-view />
      </section>
    </div>

    <footer class="footer">
      <h3 class="has-text-centered is-size-4">JUST FKIN LIFTTTTT!</h3>
      <p class="has-text-centered is-size-6">Copyright (c) 2023</p>
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

#wrapper {
  background-image: url("@/assets/img/wpp.jpg");
}

.bg {
  background-color: rgba(222, 222, 222, 0.2);
}

.section {
  max-width: 1200px;
  margin: auto;
  color: white;
  min-height: 100vh;
}

.footer {
  color: white;
  background-color: black;
}
</style>
