<script setup>
import { defineProps, defineEmits } from 'vue';
import { categories } from '../../mock-data/products';

const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  selectedCategory: {
    type: String,
    required: true
  }
});

// const categories = [
  
//   { id: "electronics", name: "Electronics" },
//   { id: "clothing", name: "Clothing" },
//   { id: "home", name: "Home & Kitchen" },
//   { id: "furniture", name: "Furniture" },
// ];

const emit = defineEmits(["category-change", "search-change"]);

const categoryChangeHandler = (value) => {
  // for (const category in categories) {
  //   if (category.id === event.target.value) {
  //     this.$emit("category-change", category.id);
  //   }s
  //   console.log(event.target.value);
  // }
  // console.log(event.target.value);
  emit("category-change", value);
};


const searchChangeHandler = (event) => {
  emit("search-change", event.target.value);
};
</script>

<template>
  <div class="ProductFilter">
    <select  :value="selectedCategory" data-test="category-select">
      <option value="" data-test="category-option">All Categories</option>
      <option 
        v-for="category in categories" 
        :key="category.id" 
        :value="category.id" 
        @click="(event)=>{event.preventDefault(); categoryChangeHandler(category.id)}"
        data-test="category-option">
        {{ category.name }}
      </option>
    </select>

    <input 
      type="text"
      placeholder="Search products..." 
      @input="searchChangeHandler" 
    />
  </div>
</template>

<style scoped>
</style>

