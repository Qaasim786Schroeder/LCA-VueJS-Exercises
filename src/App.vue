<template>
  <div id="app">
    <header class="app-header">
      <div class="header-container">
        <h1>🍳 Cooking Masterclass</h1>
        <div class="wishlist-counter" :class="{ bump: animateCounter }">
          Wishlist: <span>{{ wishlist.length }}</span>
        </div>
      </div>
    </header>

    <main class="main-content">
      <section class="intro-section">
        <h2>Explore Expert-Led Workshops</h2>
        <p>
          Curated interactive cooking sessions hosted by global culinary
          experts.
        </p>

        <div class="filter-container">
          <button
            @click="filterType = 'all'"
            :class="{ active: filterType === 'all' }"
          >
            All Classes
          </button>
          <button
            @click="filterType = 'available'"
            :class="{ active: filterType === 'available' }"
          >
            Available Only
          </button>
        </div>
      </section>

      <div class="courses-grid">
        <CourseCard
          v-for="course in filteredCourses"
          :key="course.id"
          :course="course"
          :isSaved="wishlist.includes(course.id)"
          @toggle-wishlist="handleWishlistToggle"
        />
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { courses } from "./data/courses";
import CourseCard from "./components/CourseCard.vue";

export default {
  name: "App",
  components: {
    CourseCard,
  },
  setup() {
    const allCourses = ref(courses);
    const wishlist = ref([]);
    const filterType = ref("all");
    const animateCounter = ref(false);

    const filteredCourses = computed(() => {
      if (filterType.value === "available") {
        return allCourses.value.filter((c) => c.isAvailable);
      }
      return allCourses.value;
    });

    const handleWishlistToggle = (courseId) => {
      const index = wishlist.value.indexOf(courseId);
      if (index > -1) {
        wishlist.value.splice(index, 1);
      } else {
        wishlist.value.push(courseId);

        animateCounter.value = true;
        setTimeout(() => {
          animateCounter.value = false;
        }, 300);
      }
    };

    return {
      filteredCourses,
      wishlist,
      filterType,
      animateCounter,
      handleWishlistToggle,
    };
  },
};
</script>

<style>
:root {
  --primary-color: #1d3557;
  --bg-color: #f8f9fa;
}

body {
  margin: 0;
  font-family: "Inter", system-ui, sans-serif;
  background-color: var(--bg-color);
  color: #333;
}

.app-header {
  background-color: var(--primary-color);
  color: white;
  padding: 20px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

h1 {
  margin: 0;
  font-size: 1.5rem;
}

.wishlist-counter {
  background: #e63946;
  padding: 8px 16px;
  border-radius: 30px;
  font-weight: bold;
  transition: transform 0.1s ease-in-out;
}

.wishlist-counter.bump {
  transform: scale(1.2);
}

.main-content {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}

.intro-section {
  text-align: center;
  margin-bottom: 40px;
}

.filter-container {
  margin-top: 20px;
}

.filter-container button {
  background: #fff;
  border: 1px solid #ccc;
  padding: 8px 16px;
  margin: 0 5px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.filter-container button.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}
</style>
