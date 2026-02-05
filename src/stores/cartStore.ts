import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product } from './productStore';

export interface CartItem extends Product {
  quantity: number;
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);

  const cartCount = computed(() =>
    items.value.reduce((total, item) => total + item.quantity, 0)
  );

  const totalPrice = computed(() =>
    items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  );

  const addToCart = (product: Product) => {
    const existingItem = items.value.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.value.push({ ...product, quantity: 1 });
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    const item = items.value.find(i => i.id === productId);
    if (item) {
      const newQuantity = item.quantity + delta;

      if (newQuantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = newQuantity;
      }
    }
  };

  const removeFromCart = (productId: string) => {
    items.value = items.value.filter(item => item.id !== productId);
  };

  const clearCart = () => {
    items.value = [];
  };

  return {
    items,
    cartCount,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };
});