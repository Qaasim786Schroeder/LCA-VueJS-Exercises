<template>
  <div id="app">
    <header class="main-header">
      <h1>Cooking Masterclass Hub</h1>
      <p>Secure your culinary station space interactively</p>
    </header>

    <main class="page-layout">
      <section class="catalog-panel">
        <h2>Available Masterclasses</h2>
        <div class="catalog-grid">
          <div
            v-for="course in courses"
            :key="course.id"
            class="course-card"
            :class="{ 'out-of-stock': course.slots === 0 }"
          >
            <span class="status-badge sold-out" v-if="course.slots === 0"
              >Sold Out</span
            >
            <span class="status-badge available" v-else
              >{{ course.slots }} seats remaining</span
            >

            <h3>{{ course.title }}</h3>
            <p class="chef-name">Instructor: Chef {{ course.instructor }}</p>
            <p class="course-desc">{{ course.description }}</p>

            <div class="card-action-row">
              <span class="course-price">R{{ course.price.toFixed(2) }}</span>
              <button
                :disabled="course.slots === 0"
                @click="addItemToCart(course)"
              >
                {{ course.slots === 0 ? "Unavailable" : "Add to Cart" }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <CookingCart
        :cartItems="cart"
        @change-qty="modifyItemQuantity"
        @remove="discardCartItem"
        @clear-all="wipeCartClean"
      />
    </main>
  </div>
</template>

<script>
import CookingCart from "./components/CookingCart.vue";

export default {
  components: { CookingCart },
  data() {
    return {
      courses: [
        {
          id: 1,
          title: "French Pastry Basics",
          instructor: "Pierre",
          description: "Master light croissants, tarts, and choux pastries.",
          price: 1200.0,
          slots: 5,
        },
        {
          id: 2,
          title: "Artisan Sourdough Baking",
          instructor: "Sarah",
          description:
            "Learn wild yeast fermentation and baking crispy crusts.",
          price: 950.0,
          slots: 8,
        },
        {
          id: 3,
          title: "Traditional Sushi Arts",
          instructor: "Kenji",
          description:
            "Perfecting vinegared rice preparation and complex rolling styles.",
          price: 1500.0,
          slots: 0,
        },
        {
          id: 4,
          title: "Gourmet Italian Pasta",
          instructor: "Elena",
          description:
            "Roll and shape fresh ravioli and make classic rich sauces.",
          price: 1100.0,
          slots: 3,
        },
      ],
      cart: [],
    };
  },
  // Key Feature: Page refresh data state caching with localStorage
  created() {
    const cachedData = localStorage.getItem("masterclass_checkout_cart");
    if (cachedData) {
      this.cart = JSON.parse(cachedData);
    }
  },
  methods: {
    updateBrowserMemory() {
      localStorage.setItem(
        "masterclass_checkout_cart",
        JSON.stringify(this.cart),
      );
    },
    addItemToCart(course) {
      const match = this.cart.find((item) => item.id === course.id);
      if (match) {
        if (match.quantity < course.slots) {
          match.quantity++;
        } else {
          alert(
            "Cannot reserve more slots. This masterclass has reached capacity limits!",
          );
        }
      } else {
        this.cart.push({ ...course, quantity: 1 });
      }
      this.updateBrowserMemory();
    },
    modifyItemQuantity(id, targetQty) {
      if (targetQty <= 0) {
        this.discardCartItem(id);
        return;
      }
      const match = this.cart.find((item) => item.id === id);
      if (match && targetQty <= match.slots) {
        match.quantity = targetQty;
      } else {
        alert(
          "Cannot reserve more slots. This masterclass has reached capacity limits!",
        );
      }
      this.updateBrowserMemory();
    },
    discardCartItem(id) {
      this.cart = this.cart.filter((item) => item.id !== id);
      this.updateBrowserMemory();
    },
    wipeCartClean() {
      this.cart = [];
      this.updateBrowserMemory();
    },
  },
};
</script>

<style>
body {
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  background-color: #f8fafc;
  margin: 0;
  color: #334155;
  padding-bottom: 60px;
}
.main-header {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
  padding: 30px 20px;
  text-align: center;
  margin-bottom: 40px;
}
.main-header h1 {
  margin: 0 0 6px 0;
  font-size: 2.2rem;
}
.main-header p {
  margin: 0;
  opacity: 0.8;
  font-size: 1.05rem;
}

.page-layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}
.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.course-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.01);
}
.course-card.out-of-stock {
  opacity: 0.55;
  background: #f1f5f9;
}

.status-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 20px;
  color: white;
}
.status-badge.sold-out {
  background: #ef4444;
}
.status-badge.available {
  background: #10b981;
}

h3 {
  margin: 0 0 6px 0;
  color: #1e293b;
  font-size: 1.2rem;
}
.chef-name {
  font-style: italic;
  color: #64748b;
  margin: 0 0 12px 0;
  font-size: 0.85rem;
}
.course-desc {
  font-size: 0.92rem;
  color: #475569;
  line-height: 1.4;
  flex-grow: 1;
  margin-bottom: 20px;
}
.card-action-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}
.course-price {
  font-weight: bold;
  font-size: 1.25rem;
  color: #0f172a;
}

.card-action-row button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
.card-action-row button:disabled {
  background: #cbd5e1;
  color: #94a3b8;
  cursor: not-allowed;
}

@media (max-width: 900px) {
  .page-layout {
    grid-template-columns: 1fr;
  }
}
</style>
