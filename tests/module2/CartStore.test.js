import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { products } from "../../mock-data/products";

describe("Cart Store", () => {
  beforeEach(() => {
    // Create a fresh pinia instance for each test
    setActivePinia(createPinia());
  });

  //1. Test if the cart store initializes with an empty cart
  it("initializes with empty cart", async () => {
    let useCartStore;
    try {
      useCartStore = (await import("../../src/stores/cartStore")).useCartStore;
    } catch (e) {
      expect.fail("Cart store not found. Create the store first.");
    }

    const cartStore = useCartStore();

    // Check initial state
    expect(cartStore.items).toEqual([]);
    expect(cartStore.totalItems).toBe(0);
    expect(cartStore.subtotal).toBe(0);
  });

  //2. Test if the cart store adds a product to the cart

  it("adds a product to the cart", async () => {
    let useCartStore;
    try {
      useCartStore = (await import("../../src/stores/cartStore")).useCartStore;
    } catch (e) {
      expect.fail("Cart store not found. Create the store first.");
    }

    const cartStore = useCartStore();
    const product = products[0];

    // Add a product to the cart
    cartStore.addToCart(product);

    // Check if the product was added correctly
    expect(cartStore.items.length).toBe(1);
    expect(cartStore.items[0].product).toEqual(product);
    expect(cartStore.items[0].quantity).toBe(1);
    expect(cartStore.totalItems).toBe(1);
  });

  //3. Test if the cart store increases the quantity when adding the same product again

  it("increases quantity when adding the same product again", async () => {
    let useCartStore;
    try {
      useCartStore = (await import("../../src/stores/cartStore")).useCartStore;
    } catch (e) {
      expect.fail("Cart store not found. Create the store first.");
    }

    const cartStore = useCartStore();
    const product = products[0];

    // Add a product to the cart
    cartStore.addToCart(product);
    // Add the same product again
    cartStore.addToCart(product);

    // Check if the quantity was increased
    expect(cartStore.items.length).toBe(1);
    expect(cartStore.items[0].quantity).toBe(2);
    expect(cartStore.totalItems).toBe(2);
  });

  //4. Test if the cart store updates the quantity of a product in the cart

  it("updates the quantity of a product in the cart", async () => {
    let useCartStore;
    try {
      useCartStore = (await import("../../src/stores/cartStore")).useCartStore;
    } catch (e) {
      expect.fail("Cart store not found. Create the store first.");
    }

    const cartStore = useCartStore();
    const product = products[0];

    // Add a product to the cart
    cartStore.addToCart(product);

    // Update the quantity
    cartStore.updateQuantity(product.id, 3);

    // Check if the quantity was updated
    expect(cartStore.items[0].quantity).toBe(3);
    expect(cartStore.totalItems).toBe(3);
  });

  //5. Test if the cart store removes a product from the cart

  it("removes a product from the cart", async () => {
    let useCartStore;
    try {
      useCartStore = (await import("../../src/stores/cartStore")).useCartStore;
    } catch (e) {
      expect.fail("Cart store not found. Create the store first.");
    }

    const cartStore = useCartStore();
    const product1 = products[0];
    const product2 = products[1];

    // Add two products to the cart
    cartStore.addToCart(product1);
    cartStore.addToCart(product2);

    // Remove the first product
    cartStore.removeFromCart(product1.id);

    // Check if the product was removed correctly
    expect(cartStore.items.length).toBe(1);
    expect(cartStore.items[0].product.id).toBe(product2.id);
  });

  //6. Test if the cart store clears the entire cart

  it("clears the entire cart", async () => {
    let useCartStore;
    try {
      useCartStore = (await import("../../src/stores/cartStore")).useCartStore;
    } catch (e) {
      expect.fail("Cart store not found. Create the store first.");
    }

    const cartStore = useCartStore();

    // Add multiple products to the cart
    cartStore.addToCart(products[0]);
    cartStore.addToCart(products[1]);

    // Clear the cart
    cartStore.clearCart();

    // Check if the cart is empty
    expect(cartStore.items).toEqual([]);
    expect(cartStore.totalItems).toBe(0);
  });

  //7. Test if the cart store calculates the subtotal correctly

  it("calculates subtotal correctly", async () => {
    let useCartStore;
    try {
      useCartStore = (await import("../../src/stores/cartStore")).useCartStore;
    } catch (e) {
      expect.fail("Cart store not found. Create the store first.");
    }

    const cartStore = useCartStore();
    const product1 = products[0]; // Price: 199.99
    const product2 = products[1]; // Price: 149.99

    // Add products to the cart with different quantities
    cartStore.addToCart(product1); // 1 x 199.99 = 199.99
    cartStore.updateQuantity(product1.id, 2); // 2 x 199.99 = 399.98
    cartStore.addToCart(product2); // 1 x 149.99 = 149.99

    // Expected subtotal: 399.98 + 149.99 = 549.97
    expect(cartStore.subtotal).toBeCloseTo(549.97, 2);
  });

  //8. Test if the cart store calculates the tax correctly

  it("calculates tax correctly (8% of subtotal)", async () => {
    let useCartStore;
    try {
      useCartStore = (await import("../../src/stores/cartStore")).useCartStore;
    } catch (e) {
      expect.fail("Cart store not found. Create the store first.");
    }

    const cartStore = useCartStore();
    const product = products[0]; // Price: 199.99

    // Add a product to the cart
    cartStore.addToCart(product);

    // Expected tax: 199.99 * 0.08 = 16.00 (rounded)
    expect(cartStore.tax).toBeCloseTo(16.0, 2);
  });

  //9. Test if the cart store calculates the grand total correctly

  it("calculates grand total correctly (subtotal + tax)", async () => {
    let useCartStore;
    try {
      useCartStore = (await import("../../src/stores/cartStore")).useCartStore;
    } catch (e) {
      expect.fail("Cart store not found. Create the store first.");
    }

    const cartStore = useCartStore();
    const product = products[0]; // Price: 199.99

    // Add a product to the cart
    cartStore.addToCart(product);

    // Expected subtotal: 199.99
    // Expected tax: 199.99 * 0.08 = 16.00 (rounded)
    // Expected grand total: 199.99 + 16.00 = 215.99
    expect(cartStore.grandTotal).toBeCloseTo(215.99, 2);
  });
});
