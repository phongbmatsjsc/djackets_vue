<template>
    <div class="page-success">
        <div class="columns is-multiline">
            <div class="column is-12 custom">
                <h1 class="title">Thank you</h1>
                <p>Your order will be processed within 48 hours</p>
            </div>
            <div class="column "></div>
        </div>
        <router-link to="/" class="button is-success">Continue shopping</router-link>
    </div>
</template>

<script>
    export default {
        name: 'Success',
        mounted() {
            document.title = 'Success | TheMuscleShop'
        },
    }
</script>

<style lang="scss" scoped>
    .custom {
        background-color: white;
        border-radius: 6px;
        p {
            color: black;
        }
    }
</style>