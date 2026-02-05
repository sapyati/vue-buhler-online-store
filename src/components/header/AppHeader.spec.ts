import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';
import AppHeader from './AppHeader.vue';
import { useCartStore } from '@/stores/cartStore';

vi.mock('@/utils/date', () => ({
  formatHeaderDate: vi.fn(() => 'Thursday, February 5, 2026')
}));

describe('AppHeader.vue', () => {
  let router: Router;

  beforeEach(() => {
    setActivePinia(createPinia());

    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', name: 'home', component: { template: '<div></div>' } },
        { path: '/checkout', name: 'checkout', component: { template: '<div></div>' } }
      ],
    });

    vi.useFakeTimers();
  });

  it('renders the Bühler logo with high priority attributes', () => {
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [
          router,
          createTestingPinia({ createSpy: vi.fn })
        ]
      }
    });

    const logo = wrapper.find('img[alt="Bühler Logo"]');
    expect(logo.attributes('fetchpriority')).toBe('high');
    expect(logo.attributes('width')).toBe('150');
  });

  it('displays the current cart count from the store', async () => {
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            initialState: {
              cart: {
                items: [
                  { id: '1', name: 'Machine A', price: 100, quantity: 2 },
                  { id: '2', name: 'Machine B', price: 200, quantity: 3 }
                ]
              }
            },
            createSpy: vi.fn,
          })
        ]
      }
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('(5)');
  });

  it('triggers pulse animation when cart count increases', async () => {
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            initialState: { cart: { cartCount: 0 } },
            createSpy: vi.fn,
            stubActions: false
          })
        ]
      }
    });

    const cartStore = useCartStore();

    // Initial check
    expect(wrapper.find('.pulse-animation').exists()).toBe(false);

    // Trigger the change.
    // In @pinia/testing, getters are writable, but TS still sees them as readonly.
    // @ts-expect-error: cartCount is a getter and read-only in production, but writable in testing pinia
    cartStore.cartCount = 1;

    // Wait for Vue to process the watcher and update the template
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.pulse-animation').exists()).toBe(true);

    // Fast-forward time (300ms) to check cleanup
    vi.advanceTimersByTime(300);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.pulse-animation').exists()).toBe(false);
  });

  it('cleans up the interval timer on unmount', () => {
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
    const wrapper = mount(AppHeader, {
      global: {
        plugins: [
          router,
          createTestingPinia({ createSpy: vi.fn })
        ]
      }
    });

    wrapper.unmount();
    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});