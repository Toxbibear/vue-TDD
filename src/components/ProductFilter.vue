<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  selectedCategory: {
    type: [String, Number],
    required: false
  }
});

const emit = defineEmits(["category-change", "search-change"]);

const categoryChangeHandler = (event) => {
  emit("category-change", event.target.value);
};


const searchChangeHandler = (event) => {
  emit("search-change", event.target.value);
};
</script>

<template>
  <div class="ProductFilter">
    <select @change="categoryChangeHandler" :value="selectedCategory">
      <option value="">All Categories</option>
      <option 
        v-for="category in categories" 
        :key="category.id" 
        :value="category.id" 
        :data-test="'category-option'">
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

