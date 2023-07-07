<template>
  <div class="home">
    <!-- <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">Welcome to The Muscle Shop</p>
        <p class="subtitle">Optimize your gain with us.</p>
      </div>
    </section> -->
    <img src="@/assets/img/logo-white-extended.png" alt="">

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered is-responsive">Latest products</h2>
      </div>
      <ProductBox
        v-for="product in latestProducts"
        :product="product"
        :key="product.id"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import ProductBox from '@/components/ProductBox.vue';

export default {
  name: "HomeView",
  components: {
    ProductBox,
},
  data() {
    return {
      latestProducts: []
    }
  },
  mounted() {
    this.getLatestProducts()
    document.title = 'Home | TheMuscleShop'
  },
  methods: {
    async getLatestProducts() {
      this.$store.commit('setIsLoading', true)
      await axios
        .get('/api/v1/latest-products/')
        .then(response => {
          this.latestProducts = response.data
        })
        .catch(error => {
          console.log(error)
        })
      this.$store.commit('setIsLoading', false)
    }
  }
};
</script>


<style lang="scss" scoped>
</style>