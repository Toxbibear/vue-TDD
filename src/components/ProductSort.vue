<script setup>
import { defineProps, defineEmits, computed } from "vue";

// Define props
const props = defineProps({
  currentSort: {
    type: String,
    required: true
  }
});

// Define event emitter
const emit = defineEmits(['sort-change']);
console.log(emit)
// Sorting options
const sortOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Rating: High to Low" }
];

// Emit the selected sorting option
const sortChangeHandler = (event) => {
  emit('sort-change', event.target.value);
  console.log(event.target.value)
};
</script>

<template>
  <div>
    <select @change="sortChangeHandler" data-test="sort-select">
      <option 
        v-for="option in sortOptions" 
        :key="option.value" 
        :value="option.value"
        @click="sortChangeHandler"
        :data-test="option.value === currentSort ? 'selected-sort-option' : 'sort-option'"
        :class="{ active: option.value === currentSort, selected: option.value === currentSort }">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>


