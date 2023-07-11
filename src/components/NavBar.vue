<template>
    <!-- NAVBAR -->
    <nav class="navbar is-black is-fixed-top">
        <!-- NAVBAR BRAND -->
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item">
            <img class="mr-3" src="@/assets/img/logo-no-background.png">
            <strong>THE MUSCLE SHOP</strong>
          </router-link>
        <a
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar-menu"
            @click="showMobileMenu = !showMobileMenu"
        >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
        </div>

        <div
        class="navbar-menu"
        id="navbar-menu"
        v-bind:class="{ 'is-active': showMobileMenu }"
        >

        <!-- NAVBAR START ~ SEARCH-->
        <div class="navbar-start">
            <div class="navbar-item">
              <form method="get" action="/search">
                  <div class="field has-addons">
                  <div class="control">
                      <input
                      type="text"
                      class="input"
                      placeholder="What are you up to?"
                      name="query"
                      />
                  </div>
                  <div class="control">
                      <button class="button is-success">
                      <span class="icon"><i class="fas fa-search"></i></span>
                      </button>
                  </div>
                  </div>
              </form>
            </div>
        </div>

        <!-- NAVBAR END -->
        <div class="navbar-end">
            <!-- EXERLIB AND PRODUCTS -->
            <div class="navbar-item">
              <div class="buttons">
                <router-link class="button is-success" to="/exercises">
                  ExerLib
                </router-link>
                <div class="dropdown is-hoverable">
                  <div class="dropdown-trigger">
                    <button class="button is-success" aria-haspopup="true" aria-controls="dropdown-menu">
                      <span>Products</span>
                      <span class="icon is-small">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </button>
                  </div>
                  <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                      <router-link v-for="category in categories" :to="`${ category.link }`" class="dropdown-item is">{{ category.name }}</router-link>                  
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- ACCOUNT AND CART -->
            <div class="navbar-item">
              <div class="buttons">
                  <template v-if="$store.state.isAuthenticated">
                  <router-link to="/my-account" class="button is-light"
                      >My Account</router-link>
                  </template>
                  <template v-else>
                  <router-link to="/log-in" class="button is-light"
                      >Log in</router-link>
                  </template>
                  <router-link to="/cart" class="button is-success">
                  <span class="icon">
                      <i class="fas fa-shopping-cart"></i>
                  </span>
                  <span>Cart ({{ cartTotalLength }})</span>
                  </router-link>
              </div>
            </div>
          </div>
        </div>
    </nav>
    <div class="is-loading-bar has-text-centered" :class="{'is-loading': $store.state.isLoading}">
        <div class="lds-dual-ring"></div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NavBar",
  data() {
    return {
      showMobileMenu: false,
      dropdownActive: false,
      cart: {
        items: [],
      },
      categories: [],
    };
  },
  beforeCreate() {
    this.$store.commit("initializeStore");
    const token = this.$store.state.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
  mounted() {
    this.cart = this.$store.state.cart;
    this.getAllCategory()
  },
  computed: {
    cartTotalLength() {
      let totalLength = 0;
      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].quantity;
      }
      return totalLength;
    },
  },

  methods: {
    async getAllCategory() {
      axios
        .get('/api/v1/category/')
        .then(response => {
          this.categories = response.data.map((item) => {
            return { "name": item.name, "link": "/" + item.name.toLowerCase() };
          });
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  padding: 4px 0;
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.is-loading-bar {
  height: 0;
  overflow: hidden;

  -webkit-transition: all 0.3s;
  transition: all 0.3s;

  &.is-loading {
    height: 80px;
  }
}
</style>
