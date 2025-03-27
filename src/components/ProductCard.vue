<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['add-to-cart']);

const addToCart = () => {
  emit('add-to-cart', props.product);
}
</script>

<template>
  <div class="productCard">
    <div class="productCardContainer">
      <img :src="product.images[0]" :alt="product.name">
      <div class="productCardTextContainer">
        <h3>{{ product.name }}</h3>
        <div class="price">${{ product.price.toFixed(2) }}</div>
        <div class="rating">{{ product.rating }}</div>
      </div>
    </div>
    <button @click="addToCart">Add to Cart</button>
  </div>
</template>

<style scoped></style>