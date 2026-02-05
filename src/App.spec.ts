import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue';
import AppHeader from '@/components/header/AppHeader.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div>Home</div>' } }],
});

describe('App.vue', () => {
  it('renders the AppHeader component', async () => {
    const wrapper = shallowMount(App, {
      global: {
        plugins: [router],
        stubs: ['RouterView']
      }
    });

    expect(wrapper.findComponent(AppHeader).exists()).toBe(true);
  });

  it('contains a main element with the page-content class', () => {
    const wrapper = shallowMount(App, {
      global: {
        plugins: [router],
        stubs: ['RouterView']
      }
    });

    const mainElement = wrapper.find('main.page-content');
    expect(mainElement.exists()).toBe(true);
  });

  it('renders the RouterView component for main content', () => {
    const wrapper = shallowMount(App, {
      global: {
        plugins: [router],
        stubs: ['RouterView']
      }
    });

    expect(wrapper.find('router-view-stub').exists()).toBe(true);
  });
});