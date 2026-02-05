<template>
  <header class="header">
    <div class="header__container">
      <router-link to="/" class="logo">
        <img
          src="@/assets/buhler-logo.svg"
          alt="Bühler Logo"
          width="150"
          height="30"
          loading="eager"
          fetchpriority="high"
        />
      </router-link>

      <div class="date-time">{{ currentDateTime }}</div>

      <router-link to="/checkout" class="cart-info">
        <img src="@/assets/cart.svg" alt="cart-icon">
        <span :class="{ 'pulse-animation': isPulsing }">
          Cart <span class="total">({{ cartStore.cartCount }})</span>
        </span>
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useCartStore } from '@/stores/cartStore';
import { formatHeaderDate } from '@/utils/date';

const cartStore = useCartStore();
const currentDateTime = ref('');
const isPulsing = ref(false);

watch(() => cartStore.cartCount, (newCount, oldCount) => {
  if (newCount > oldCount) {
    isPulsing.value = true;

    setTimeout(() => {
      isPulsing.value = false;
    }, 300);
  }
});

let timer: ReturnType<typeof setInterval> | undefined;

onMounted(() => {
  const updateTime = () => {
    currentDateTime.value = formatHeaderDate(new Date());
  };
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped lang="scss">
  @import "./AppHeader.scss"
</style>