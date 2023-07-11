<template>
    <div class="column is-3">
        <div class="box custom">
          <figure class="image is-4by5 mb-4">
            <img :src="product.get_thumbnail" :alt="product.description">
          </figure>
          <h3 class="is-size-6">{{ product.name }}</h3>
          <p class="is-size-6 has-text-grey">$ {{ product.price }}</p>

          <router-link :to="product.get_absolute_url" class="button is-dark is-fullwidth mt-4">View details</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ProductBox',
        props: {
            product: Object
        }
    }
</script>

<style lang="scss" scoped>

.image {
  overflow: hidden;

  img {
    object-fit: cover;
  }
}

.custom {
  padding: 0.75rem;
  background-color: white;
}
</style>