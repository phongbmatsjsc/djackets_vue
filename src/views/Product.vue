<template>
    <div class="page-product">
        <div class="columns is-multiline product">
            <div class="column is-8">
                <figure class="image mb-6">
                    <img :src="product.get_image">
                </figure>
            </div>
            
            <div class="column is-4 mt-4">
                <h1 class="title">{{ product.name }}</h1>
                <p class="content">{{ product.description }}</p>
                
                <h2 class="subtitle mt-3"><strong>Price: </strong>${{ product.price }}</h2>
                <div class="field has-addons mt-4">
                    <div class="control">
                        <input type="number" class="input" min="1" v-model="quantity">
                    </div>

                    <div class="control">
                        <a class="button is-primary" @click="addToCart">Add to cart</a>
                    </div>
                </div>
                <button @click="goBack" class="button is-dark mt-3 back">Back to shopping</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {toast} from 'bulma-toast'

    export default {
        name: 'Product',
        data() {
            return {
                product: {},
                quantity:1
            }
        }, 
        mounted() {
            this.getProduct()
        },
        methods: {
            async getProduct() {
                this.$store.commit('setIsLoading', true)

                const category_slug = this.$route.params.category_slug
                const product_slug = this.$route.params.product_slug

                await axios
                    .get(`api/v1/products/${category_slug}/${product_slug}`)
                    .then(response => {
                        this.product = response.data
                        document.title = this.product.name + ' | TheMuscleShop'
                    })
                    .catch(error => {
                        console.log(error);
                    })
                
                this.$store.commit('setIsLoading', false)
            },

            addToCart() {
                if (isNaN(this.quantity) || this.quantity <1) {
                    this.quantity = 1
                }
                const item = {
                    product: this.product,
                    quantity: this.quantity,
                }
                this.$store.commit('addToCart', item)

                toast({
                    message: "The product was added to the cart",
                    type: "is-success",
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right',
                })
            },

            goBack() {
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
            }
        }
    }
</script>

<style lang="scss" scoped>
.product {
    background-color: white;
    border-radius: 8px;
    .content {
        color: black;
    }
    .back {
        width: 100%;
    }
}

</style>