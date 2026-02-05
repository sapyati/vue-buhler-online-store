import { createRouter, createWebHistory } from 'vue-router';
import ProductListView from '@/views/product-list/ProductListView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'product-list',
      component: ProductListView
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: () => import('@/views/product-detail/ProductDetailView.vue'),
      props: true
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/views/checkout/CheckoutView.vue')
    }
  ],
});

export default router;
