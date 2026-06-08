<template>
  <div class="course-card" :class="{ 'sold-out-card': !course.isAvailable }">
    <div class="image-container">
      <img :src="course.image" :alt="course.title" />
      <span v-if="!course.isAvailable" class="badge sold-out-badge"
        >Sold Out</span
      >
    </div>

    <div class="card-content">
      <span class="level-tag">{{ course.level }}</span>
      <h3>{{ course.title }}</h3>
      <p class="chef-name">By {{ course.chef }}</p>

      <div class="card-footer">
        <span class="price">R {{ course.price.toFixed(2) }}</span>

        <button
          @click="$emit('toggle-wishlist', course.id)"
          :disabled="!course.isAvailable"
          :class="['save-btn', { 'is-saved': isSaved }]"
        >
          {{ isSaved ? "✓ Saved" : "Save to Wishlist" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseCard",
  props: {
    course: {
      type: Object,
      required: true,
    },
    isSaved: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.course-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.sold-out-card {
  opacity: 0.75;
}

.image-container {
  position: relative;
  height: 200px;
  width: 100%;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #e63946;
  color: #fff;
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 20px;
  text-transform: uppercase;
}

.card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.level-tag {
  font-size: 0.75rem;
  color: #1d3557;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

h3 {
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  color: #1d3557;
}

.chef-name {
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.card-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1d3557;
}

.save-btn {
  background: #457b9d;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s ease;
}

.save-btn:hover:not(:disabled) {
  background: #1d3557;
}

.save-btn.is-saved {
  background: #2a9d8f;
}

.save-btn:disabled {
  background: #ced4da;
  cursor: not-allowed;
  color: #6c757d;
}
</style>
