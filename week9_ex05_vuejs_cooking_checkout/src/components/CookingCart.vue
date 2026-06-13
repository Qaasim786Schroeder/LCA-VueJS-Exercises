<template>
  <div class="cart-box">
    <h2>Your Basket</h2>

    <div v-if="cartItems.length === 0" class="empty-msg">
      Your cart is empty. Pick an available culinary class to begin!
    </div>

    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <div class="item-info">
          <h4>{{ item.title }}</h4>
          <span class="item-price">R{{ item.price.toFixed(2) }} each</span>
        </div>

        <div class="item-controls">
          <button @click="$emit('change-qty', item.id, item.quantity - 1)">
            -
          </button>
          <span class="qty-num">{{ item.quantity }}</span>
          <button
            @click="$emit('change-qty', item.id, item.quantity + 1)"
            :disabled="item.quantity >= item.slots"
          >
            +
          </button>
          <button @click="$emit('remove', item.id)" class="del-btn">
            Remove
          </button>
        </div>

        <div class="item-total">
          R{{ (item.price * item.quantity).toFixed(2) }}
        </div>
      </div>

      <div class="coupon-box">
        <input v-model="promoField" placeholder="Voucher Code (SAVE10)" />
        <button @click="checkPromo">Apply</button>
      </div>
      <p v-if="promoApplied" class="txt-success">
        🎉 10% coupon deduction applied!
      </p>
      <p v-if="promoError" class="txt-error">❌ Invalid code entry.</p>

      <hr />

      <div class="totals-breakdown">
        <div class="row">
          <span>Subtotal:</span>
          <span>R{{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="row discount" v-if="promoApplied">
          <span>Discount (10%):</span>
          <span>-R{{ discount.toFixed(2) }}</span>
        </div>
        <div class="row">
          <span>VAT (15%):</span>
          <span>R{{ simpleTax.toFixed(2) }}</span>
        </div>
        <div class="row grand-total">
          <span>Grand Total:</span>
          <span>R{{ grandTotal.toFixed(2) }}</span>
        </div>
      </div>

      <div class="cart-actions">
        <button @click="$emit('clear-all')" class="btn-clear">
          Clear Basket
        </button>
        <button @click="checkoutAlert" class="btn-checkout">
          Checkout Simulation
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cartItems: { type: Array, required: true },
  },
  emits: ["change-qty", "remove", "clear-all"],
  data() {
    return {
      promoField: "",
      promoApplied: false,
      promoError: false,
    };
  },
  computed: {
    subtotal() {
      return this.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    },
    discount() {
      return this.promoApplied ? this.subtotal * 0.1 : 0;
    },
    simpleTax() {
      return (this.subtotal - this.discount) * 0.15;
    },
    grandTotal() {
      return this.subtotal - this.discount + this.simpleTax;
    },
  },
  methods: {
    checkPromo() {
      if (this.promoField.trim().toUpperCase() === "SAVE10") {
        this.promoApplied = true;
        this.promoError = false;
      } else {
        this.promoError = true;
        this.promoApplied = false;
      }
    },
    checkoutAlert() {
      alert(
        `Checkout Success! Total processed amount: R${this.grandTotal.toFixed(2)}`,
      );
    },
  },
};
</script>

<style scoped>
.cart-box {
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
}
.empty-msg {
  color: #64748b;
  text-align: center;
  padding: 30px 0;
  font-size: 0.95rem;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
}
.item-info h4 {
  margin: 0;
  font-size: 0.95rem;
  color: #1e293b;
}
.item-price {
  font-size: 0.8rem;
  color: #64748b;
}
.item-controls button {
  padding: 4px 10px;
  margin: 0 2px;
  cursor: pointer;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-weight: bold;
}
.item-controls button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.qty-num {
  font-weight: bold;
  padding: 0 8px;
  font-size: 0.95rem;
}
.del-btn {
  background: transparent !important;
  border: none !important;
  color: #ef4444;
  margin-left: 10px;
  font-size: 0.85rem;
  cursor: pointer;
}
.item-total {
  font-weight: bold;
  width: 90px;
  text-align: right;
  color: #0f172a;
}
.coupon-box {
  display: flex;
  gap: 8px;
  margin-top: 20px;
}
.coupon-box input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
}
.coupon-box button {
  background: #475569;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
.txt-success {
  color: #10b981;
  font-size: 0.85rem;
  margin: 6px 0 0;
}
.txt-error {
  color: #ef4444;
  font-size: 0.85rem;
  margin: 6px 0 0;
}
hr {
  border: 0;
  border-top: 1px solid #e2e8f0;
  margin: 20px 0;
}
.totals-breakdown {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.row {
  display: flex;
  justify-content: space-between;
  color: #475569;
  font-size: 0.95rem;
}
.discount {
  color: #10b981;
  font-weight: 500;
}
.grand-total {
  font-size: 1.3rem;
  font-weight: bold;
  color: #0f172a;
  border-top: 2px solid #e2e8f0;
  padding-top: 12px;
}
.cart-actions {
  display: flex;
  gap: 10px;
  margin-top: 24px;
}
.btn-checkout {
  flex: 2;
  background: #10b981;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}
.btn-clear {
  flex: 1;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  color: #64748b;
  cursor: pointer;
}
</style>
