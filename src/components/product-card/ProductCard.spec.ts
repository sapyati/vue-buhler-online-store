import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import ProductCard from './ProductCard.vue';
import { useCartStore } from '@/stores/cartStore';

const mockNotifySuccess = vi.fn();
vi.mock('@/composables/useNotification', () => ({
  useNotification: () => ({
    notifySuccess: mockNotifySuccess
  })
}));

describe('ProductCard.vue', () => {
  let router: Router;
  const mockProduct = {
    id: 'buhler-123',
    name: 'Roller MDDP',
    price: 1500.50,
    imageUrl: 'https://dam.buhlergroup.com/test.jpg',
    category: "test"
  };

  beforeEach(() => {
    setActivePinia(createPinia());
    router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/product/:id', component: { template: '<div></div>' } }]
    });
    vi.clearAllMocks();
  });

  it('renders product details correctly', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct, priority: false },
      global: { plugins: [router] }
    });

    expect(wrapper.find('.product-title').text()).toBe('Roller MDDP');
    expect(wrapper.find('.price').text()).toContain('1500.50');
    expect(wrapper.find('img.product-image').attributes('src')).toBe(mockProduct.imageUrl);
  });

  it('applies high priority attributes when priority prop is true', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct, priority: true },
      global: { plugins: [router] }
    });

    const img = wrapper.find('img.product-image');
    expect(img.attributes('fetchpriority')).toBe('high');
    expect(img.attributes('loading')).toBe('eager');
  });

  it('applies lazy loading attributes when priority prop is false', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct, priority: false },
      global: { plugins: [router] }
    });

    const img = wrapper.find('img.product-image');
    expect(img.attributes('fetchpriority')).toBe('auto');
    expect(img.attributes('loading')).toBe('lazy');
  });

  it('calls cartStore.addToCart and shows notification on button click', async () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct, priority: false },
      global: { plugins: [router] }
    });

    const cartStore = useCartStore();
    const addToCartSpy = vi.spyOn(cartStore, 'addToCart');

    const button = wrapper.find('.cart-button');
    await button.trigger('click');

    expect(addToCartSpy).toHaveBeenCalledWith(mockProduct);
    expect(mockNotifySuccess).toHaveBeenCalled();
  });

  it('contains correct router links to product details', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct, priority: false },
      global: { plugins: [router] }
    });

    const links = wrapper.findAllComponents({ name: 'RouterLink' });
    links.forEach(link => {
      expect(link.props('to')).toBe(`/product/${mockProduct.id}`);
    });
  });
});