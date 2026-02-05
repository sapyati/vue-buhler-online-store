<script setup lang="ts">
import { useNotification } from '@/composables/useNotification';
import { useCartStore } from '@/stores/cartStore';
import type { Product } from '@/stores/productStore';

const props = defineProps<{
  product: Product;
  priority: boolean;
}>();

const cartStore = useCartStore();
const { notifySuccess } = useNotification();

const handleAddToCart = () => {
  cartStore.addToCart(props.product);
  notifySuccess();
};
</script>

<template>
  <div class="product-card">
    <router-link :to="`/product/${product.id}`" class="image-link">
      <div class="image-wrapper">
        <img
          :src="product.imageUrl"
          :alt="product.name"
          class="product-image"
          :loading="priority ? 'eager' : 'lazy'"
          :fetchpriority="priority ? 'high' : 'auto'"
          decoding="async"
        />
      </div>
    </router-link>

    <div class="card-body">
      <router-link :to="`/product/${product.id}`" class="image-link">
        <h3 class="product-title">{{ product.name }}</h3>
      </router-link>

      <div class="card-footer">
        <span class="price">x{{ product.price.toFixed(2) }}</span>

        <button
          class="cart-button"
          @click="handleAddToCart"
          aria-label="Add to cart"
        >
          <img src="@/assets/cart.svg" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import "./ProductCard.scss"
</style>