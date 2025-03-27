<script setup>
const props = defineProps(
    name: String,
    price: Number,
    rating: Number,
    img: String,
);
</script>

<template>
    <div class="productCard">
        <div class="productCardContainer">
            <img src={{img}} alt="">
            <div class="productCardTextContainer">
                <h3>{{name}}</h3>
                <div name="price" class="price">{{price}}</div>
                <div class="rating">{{rating}}</div>
            </div>
        </div>
    </div>

</template>

<style scoped></style>