import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue'),
  },
  {
    path: '/log-in',
    name: 'LogIn',
    component: () => import('../views/LogIn.vue'), 
  },
  {
    path: '/my-account',
    name: 'MyAccount',
    component: () => import('../views/MyAccount.vue'), 
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/search/',
    name: 'Search',
    component: () => import('../views/Search.vue'), 
  },
  {
    path: '/:category_slug/:product_slug/',
    name: 'Product',
    component: () => import('../views/Product.vue'), 
  },
  {
    path: '/:category_slug/',
    name: 'Category',
    component: () => import('../views/Category.vue'), 
  },
  {
    path: '/cart/',
    name: 'Cart',
    component: () => import('../views/Cart.vue'), 
  },
  {
    path: '/cart/checkout',
    name: 'Checkout',
    component: () => import('../views/Checkout.vue'), 
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/cart/success',
    name: 'Success',
    component: () => import('../views/Success.vue'), 
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({ name: 'LogIn', query: { to: to.path } });
  } else {
    next()
  }
})
export default router
