<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';
import ProductCard from '@/components/product-card/ProductCard.vue';
import { useCategoryFormatter } from '@/composables/useCategoryFormatter';

const productStore = useProductStore();
const { formatCategory } = useCategoryFormatter();

onMounted(async () => {
  if (productStore.products.length === 0) {
    await productStore.fetchProducts();
  }
});
</script>

<template>
  <div class="product-list-container">
    <div v-if="productStore.loading" class="status-message">
      <div class="spinner"></div>
      <p>Loading our latest innovations...</p>
    </div>

    <div v-else-if="productStore.error" class="status-message error">
      <p>{{ productStore.error }}</p>
      <button @click="productStore.fetchProducts" class="retry-btn">Retry</button>
    </div>

    <div v-else>
      <section
        v-for="(items, category) in productStore.groupedProducts"
        :key="category"
        class="category-group"
      >
        <h2 class="category-title">{{ formatCategory(category) }}</h2>

        <div class="product-grid">
          <ProductCard
            v-for="(product, index) in items"
            :key="product.id"
            :product="product"
            :priority="index < 3"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import "./ProductListView.scss"
</style>
