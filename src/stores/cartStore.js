import { defineStore } from 'pinia';
import useProductStore from './productStore';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    totalItems: 0,
    subtotal: 0,
    taxRate: 0.08,  
 }),
    actions: {
    addToCart(product) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ product, quantity: 1 });
      }
      this.totalItems++;
      this.subtotal += product.price;
    },
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.product.id === productId);
        if (item) {
            this.totalItems += quantity - item.quantity;
            item.quantity = quantity;
            this.subtotal = quantity * item.product.price;
        }
    },
    removeFromCart(productId) {
        const index = this.items.findIndex(item => item.product.id === productId);
        if (index !== -1) {
            this.items.splice(index, 1);    
      }},
    clearCart() {
      this.items = [];
      this.totalItems = 0;
    },
  },
  getters: {
    tax: (state) => Number((state.subtotal * state.taxRate).toFixed(2)),
    grandTotal: (state) => Number((state.subtotal + state.tax).toFixed(2)),
}
})
