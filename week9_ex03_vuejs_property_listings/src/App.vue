<template>
  <div id="app">
    <header class="app-header">
      <div class="header-container">
        <h1>Homes & Beyond</h1>
        <div class="stats">
          <span class="stat-badge"
            >Total Properties: {{ propertiesList.length }}</span
          >
          <span class="stat-badge active-badge"
            >Available Now: {{ activeListingsCount }}</span
          >
        </div>
      </div>
    </header>

    <main class="app-content">
      <section class="controls-panel">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by title or location (e.g. Camps Bay)..."
          class="search-input"
        />

        <select v-model="sortOrder" class="sort-dropdown">
          <option value="default">Sort by Price</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </section>

      <section
        v-if="filteredAndSortedProperties.length > 0"
        class="properties-grid"
      >
        <PropertyCard
          v-for="item in filteredAndSortedProperties"
          :key="item.id"
          :property="item"
          :isFavourite="favourites.includes(item.id)"
          @toggle-favourite="handleFavouriteToggle"
        />
      </section>

      <section v-else class="no-results">
        <p>
          No listings match your search criteria. Try searching another location
          or title!
        </p>
      </section>
    </main>
  </div>
</template>

<script>
import { properties } from "./data/properties.js";
import PropertyCard from "./components/PropertyCard.vue";

export default {
  name: "App",
  components: {
    PropertyCard,
  },
  data() {
    return {
      propertiesList: properties,
      searchQuery: "",
      sortOrder: "default",
      favourites:
        JSON.parse(localStorage.getItem("bookmarkedProperties")) || [],
    };
  },
  computed: {
    activeListingsCount() {
      return this.propertiesList.filter((p) => p.available).length;
    },
    filteredAndSortedProperties() {
      let result = [...this.propertiesList];

      // Dynamic Live Search Logic
      if (this.searchQuery.trim() !== "") {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(
          (property) =>
            property.title.toLowerCase().includes(query) ||
            property.location.toLowerCase().includes(query),
        );
      }

      // Price Sort Ordering Logic
      if (this.sortOrder === "low-high") {
        result.sort((a, b) => a.price - b.price);
      } else if (this.sortOrder === "high-low") {
        result.sort((a, b) => b.price - a.price);
      }

      return result;
    },
  },
  methods: {
    handleFavouriteToggle(id) {
      if (this.favourites.includes(id)) {
        this.favourites = this.favourites.filter((favId) => favId !== id);
      } else {
        this.favourites.push(id);
      }
      localStorage.setItem(
        "bookmarkedProperties",
        JSON.stringify(this.favourites),
      );
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f6f9;
  color: #333;
}
.app-header {
  background-color: #1d3557;
  color: white;
  padding: 20px 0;
}
.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.stats {
  display: flex;
  gap: 10px;
}
.stat-badge {
  background: rgba(255, 255, 255, 0.15);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
}
.active-badge {
  background: #457b9d;
}
.app-content {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}
.controls-panel {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}
.search-input {
  flex-grow: 1;
  padding: 12px 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
}
.sort-dropdown {
  padding: 12px 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  font-size: 1rem;
  cursor: pointer;
}
.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}
.no-results {
  text-align: center;
  padding: 40px;
  color: #777;
  background: white;
  border-radius: 8px;
}
@media (max-width: 600px) {
  .controls-panel {
    flex-direction: column;
  }
}
</style>
