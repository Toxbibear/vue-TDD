<script setup>
import { ref, computed } from "vue";
import { useProductStore } from "../stores/productStore";
import ProductSort from "./ProductSort.vue";
import ProductFilter from "./ProductFilter.vue";
import ProductCard from "./ProductCard.vue";

const productStore = useProductStore();

const sortProducts = (sort) => {
  productStore.setSortOption(sort);
};

const filterProducts = (category) => {
  productStore.setCategory(category);
};

const searchProducts = (query) => {
  productStore.setSearchQuery(query);
};

const addToCart = (product) => {
  productStore.addToCart(product);
};

const filteredProducts = computed(() => productStore.filteredProducts);
</script>

<template>
  <div class="product-catalog">
    <ProductSort :currentSort="productStore.sortOption"
    @sort-change="sortProducts" />
    <ProductFilter :categories="productStore.categories"
    :selectedCategory="productStore.selectedCategory" @category-change="filterProducts"
    @search-change="searchProducts" />
    <input type="text" placeholder="Search..." @input="(e) => searchProducts(e.target.value)" />

    <div v-if="filteredProducts.length" class="products-grid">
      <ProductCard 
      v-for="product in productStore.filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
    <div v-else>
      <p>No products found</p>
    </div>
  </div>
</template>

