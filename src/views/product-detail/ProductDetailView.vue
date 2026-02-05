<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore, type Product } from '@/stores/productStore';
import { useCartStore } from '@/stores/cartStore';
import { useNotification } from '@/composables/useNotification';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();
const product = ref<Product | null>(null);
const { notifySuccess } = useNotification();

onMounted(async () => {
  const id = route.params.id as string;
  const localProduct = productStore.getProductFromLocal(id);

  if (localProduct) {
    product.value = localProduct;
  } else {
    product.value = await productStore.fetchProductById(id);
  }
});

const formatCategory = (slug?: string) => {
  if (!slug) return '';
  const name = slug.split('_').pop() || '';
  return name.charAt(0).toUpperCase() + name.slice(1) + 's';
};

const handleAddToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value);
    notifySuccess();
  }
};
</script>

<template>
  <div class="detail-container" v-if="product">
    <nav class="navigation">
      <button @click="router.back()" class="back-link">
        <img src="@/assets/back.svg" alt="back to products list">
        <span>Back</span>
      </button>
    </nav>

    <div class="product-layout">
      <div class="image-section">
        <img :src="product.imageUrl" :alt="product.name" />
      </div>

      <div class="info-section">
        <h1 class="product-name">{{ product.name }}</h1>
        <p class="category-tag">{{ formatCategory(product.category) }}</p>

        <p class="price-display">x{{ product.price.toFixed(2) }}</p>

        <button @click="handleAddToCart" class="add-btn">
          <img src="@/assets/cart.svg" alt="" class="btn-icon" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  </div>

  <div v-else-if="productStore.loading" class="status-msg">Loading details...</div>
  <div v-else class="status-msg">Product not found.</div>
</template>

<style scoped lang="scss">
  @import "./ProductDetailView.scss";
</style>