<script setup lang="ts">
  import { useCartStore } from '@/stores/cartStore';
  import { useCategoryFormatter } from '@/composables/useCategoryFormatter';

  const cartStore = useCartStore();
  const { formatCategory } = useCategoryFormatter();
</script>

<template>
  <div class="checkout-container">
    <div class="checkout-header">
      <nav class="checkout-nav">
        <router-link to="/" class="back-nav-link" v-if="cartStore.items?.length">
          <img src="@/assets/back.svg" alt="back to products list">
          <span>Back to Products</span>
        </router-link>
      </nav>
      <h1 class="page-title">Checkout</h1>
    </div>

    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <p>Your cart is currently empty.</p>
      <router-link to="/" class="continue-shopping">Back to Products</router-link>
    </div>

    <div v-else class="cart-items-list">
      <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
        <div class="item-visual">
          <img :src="item.imageUrl" :alt="item.name" />
        </div>

        <div class="item-details">
          <h2 class="item-name">{{ item.name }}</h2>
          <p class="item-category">{{ formatCategory(item.category) }}</p>
        </div>

        <div class="item-actions">
          <div class="quantity-controls">
            <div class="controls-wrapper">
              <button @click="cartStore.updateQuantity(item.id, -1)" class="qty-btn">-</button>
              <span class="qty-display">{{ item.quantity }}</span>
              <button @click="cartStore.updateQuantity(item.id, 1)" class="qty-btn">+</button>
            </div>
            <span class="unit-price">x{{ item.price.toFixed(2) }}</span>
          </div>

          <span class="item-subtotal">x{{ (item.price * item.quantity).toFixed(2) }}</span>

          <button @click="cartStore.removeFromCart(item.id)" class="remove-btn" title="Remove item">
            <svg viewBox="0 0 24 24" class="close-icon"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
          </button>
        </div>
      </div>

      <div class="cart-summary">
        <div class="total-row">
          <span class="total-label">Total:</span>
          <span class="total-value">x{{ cartStore.totalPrice.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import "./CheckoutView.scss"
</style>
