import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';
import CheckoutView from './CheckoutView.vue';
import { useCartStore } from '@/stores/cartStore';

describe('CheckoutView.vue', () => {
  let router: Router;

  // Mocking the category formatter to isolate view testing
  vi.mock('@/composables/useCategoryFormatter', () => ({
    useCategoryFormatter: () => ({
      formatCategory: vi.fn((val) => `Formatted ${val}`)
    })
  }));

  const mockItems = [
    {
      id: 'm1',
      name: 'Roller Mill',
      price: 1000,
      quantity: 2,
      category: 'milling',
      imageUrl: '/img1.jpg'
    },
    {
      id: 'm2',
      name: 'Separator',
      price: 500,
      quantity: 1,
      category: 'cleaning',
      imageUrl: '/img2.jpg'
    }
  ];

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/', component: { template: '<div>Home</div>' } }]
    });
  });

  it('renders "empty cart" state when no items are present', () => {
    const wrapper = mount(CheckoutView, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            initialState: { cart: { items: [] } },
            createSpy: vi.fn
          })
        ]
      }
    });

    expect(wrapper.find('.empty-cart').exists()).toBe(true);
    expect(wrapper.text()).toContain('Your cart is currently empty.');
  });

  it('renders a list of cart items and calculates totals', () => {
    const wrapper = mount(CheckoutView, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            initialState: {
              cart: {
                items: mockItems,
                // Even if totalPrice is a getter, createTestingPinia lets us mock it here
                totalPrice: 2500
              }
            },
            createSpy: vi.fn
          })
        ]
      }
    });

    const items = wrapper.findAll('.cart-item');
    expect(items).toHaveLength(2);
    expect(wrapper.find('.total-value').text()).toContain('2500.00');
    expect(wrapper.find('.item-name').text()).toBe('Roller Mill');
  });

  it('calls updateQuantity when quantity buttons are clicked', async () => {
    const wrapper = mount(CheckoutView, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            initialState: { cart: { items: [mockItems[0]] } },
            createSpy: vi.fn,
            stubActions: false // Necessary to allow spies on the store methods
          })
        ]
      }
    });

    const cartStore = useCartStore();
    const updateSpy = vi.spyOn(cartStore, 'updateQuantity');

    // Click "+" button
    const plusBtn = wrapper.findAll('.qty-btn')[1];
    await plusBtn?.trigger('click');

    expect(updateSpy).toHaveBeenCalledWith('m1', 1);
  });

  it('calls removeFromCart when remove button is clicked', async () => {
    const wrapper = mount(CheckoutView, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            initialState: { cart: { items: [mockItems[0]] } },
            createSpy: vi.fn
          })
        ]
      }
    });

    const cartStore = useCartStore();
    const removeSpy = vi.spyOn(cartStore, 'removeFromCart');

    await wrapper.find('.remove-btn').trigger('click');
    expect(removeSpy).toHaveBeenCalledWith('m1');
  });

  it('hides the back button if the cart is empty (v-if check)', () => {
    const wrapper = mount(CheckoutView, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            initialState: { cart: { items: [] } },
            createSpy: vi.fn
          })
        ]
      }
    });

    expect(wrapper.find('.back-nav-link').exists()).toBe(false);
  });
});