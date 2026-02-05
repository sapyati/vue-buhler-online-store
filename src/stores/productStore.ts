import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
}

const MOCK_PRODUCTS: Product[] = [
  { "id": "21", "name": "Roller MDDK", "category": "machine_roller", "price": 9, "imageUrl": "https://dam.buhlergroup.com/image/5081b0d222214024b0596fd855d0c63f/-FJPG-C2032x1620%2C0%2C331-S600x450-S1024x768" },
  { "id": "22", "name": "Roller MDDL", "category": "machine_roller", "price": 9.5, "imageUrl": "https://dam.buhlergroup.com/rendition/1612076/-FPNG-TwebProduct_1x1-S800x800" },
  { "id": "23", "name": "Roller MDDP", "category": "machine_roller", "price": 9.8, "imageUrl": "https://dam.buhlergroup.com/rendition/5851cd5da6be4b7c9916ca1490a88021/-FJPG-TwebCarousel_16x9" },
  { "id": "24", "name": "Roller MDDQ", "category": "machine_roller", "price": 9.7, "imageUrl": "https://dam.buhlergroup.com/rendition/9b58c856198848b993590dc724bbb70e/-FJPG-TwebChain_1x1" },
  { "id": "25", "name": "Roller MDDM", "category": "machine_roller", "price": 9.6, "imageUrl": "https://dam.buhlergroup.com/rendition/3ef2a7694a9044d6be55c42d02ed2990/-FPNG-TwebProduct_1x1-S800x800" },
  { "id": "1", "name": "SORTEX F Optical Sorter", "category": "machine_sorter", "price": 1.2, "imageUrl": "https://dam.buhlergroup.com/image/f0c3f55df63c4c7382079730a5b9f9fe/-FJPG-C3060x1723%2C5%2C295-S1600x900-S512x288" },
  { "id": "2", "name": "SORTEX A MultiVision", "category": "machine_sorter", "price": 1.35, "imageUrl": "https://dam.buhlergroup.com/rendition/7ce428662f7344f9b2c3e337d645ded1/-FJPG-TwebTeaser_21x9-S1600x686" },
  { "id": "3", "name": "SORTEX B", "category": "machine_sorter", "price": 1.1, "imageUrl": "https://dam.buhlergroup.com/rendition/11b019c9a7324a5e824c848ced62ab1e/-FJPG-TwebTeaser_4x3-S1024x768" },
  { "id": "4", "name": "SORTEX S UltraVision", "category": "machine_sorter", "price": 1.4, "imageUrl": "https://5.imimg.com/data5/SELLER/Default/2023/12/366422842/FW/LX/FE/6370513/sortex-s-ultravision.png" },
  { "id": "13", "name": "AeroDry Conveyor Dryer", "category": "machine_dryer", "price": 8, "imageUrl": "https://dam.buhlergroup.com/rendition/d8ca742eaa5f4d3c83b8139481a104ab/-FPNG-TwebProduct_1x1" },
  { "id": "14", "name": "EcoDry Dryer", "category": "machine_dryer", "price": 8.5, "imageUrl": "https://dam.buhlergroup.com/rendition/c02fd79d78834b20a8b7d2e5d2c8e186/-FJPG-TwebHeader_1x1" },
  { "id": "15", "name": "BCT Dryer", "category": "machine_dryer", "price": 8.3, "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx4kQHVD6ORtUDIrFrsd-yqIiE47SkWWofPw&s" },
  { "id": "16", "name": "BCE Dryer", "category": "machine_dryer", "price": 8.7, "imageUrl": "https://dam.buhlergroup.com/rendition/94d51755566346a1ab571b264340e183/-FJPG-TwebHeader_16x9" },
  { "id": "17", "name": "Die Casting Machine Ecoline", "category": "machine_die_casting", "price": 1.8, "imageUrl": "https://dam.buhlergroup.com/rendition/1600309/-FJPG-TwebCarousel_16x9" }
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const fetchProducts = async (): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      await delay(500);
      products.value = MOCK_PRODUCTS;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      error.value = `Product Fetch Failed: ${errorMessage}`;
    } finally {
      loading.value = false;
    }
  };

  const fetchProductById = async (id: string): Promise<Product | null> => {
    loading.value = true;
    try {
      await delay(300);
      const product = MOCK_PRODUCTS.find(p => p.id === id);
      return product || null;
    } finally {
      loading.value = false;
    }
  };

  const groupedProducts = computed(() => {
    return products.value.reduce((groups, product) => {
      const category = product.category;
      groups[category] ??= [];
      groups[category].push(product);
      return groups;
    }, {} as Record<string, Product[]>);
  });

  const getProductFromLocal = (id: string) => {
    return products.value.find((p) => p.id === id);
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    groupedProducts,
    getProductFromLocal
  };
});