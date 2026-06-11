<template>
  <div
    class="property-card"
    :class="{ 'unavailable-fade': !property.available }"
  >
    <div class="image-container">
      <img :src="property.image" :alt="property.title" />
      <span v-if="!property.available" class="badge-unavailable"
        >Not Available</span
      >
    </div>

    <div class="card-details">
      <span class="property-type">{{ property.type }}</span>
      <h3>{{ property.title }}</h3>
      <p class="location">📍 {{ property.location }}</p>

      <div class="card-footer">
        <span class="price">R {{ property.price }} <small>/ night</small></span>

        <button @click="$emit('toggle-favourite', property.id)" class="btn-fav">
          {{ isFavourite ? "❤️" : "🤍" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PropertyCard",
  props: {
    property: {
      type: Object,
      required: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.property-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  position: relative;
}
.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
.unavailable-fade {
  opacity: 0.65;
}
.image-container {
  position: relative;
  width: 100%;
  padding-top: 60%;
}
.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.badge-unavailable {
  position: absolute;
  top: 15px;
  right: 15px;
  background: #e63946;
  color: #fff;
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 20px;
  text-transform: uppercase;
}
.card-details {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.property-type {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #8d99ae;
  font-weight: bold;
  margin-bottom: 5px;
}
h3 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  color: #2b2d42;
}
.location {
  font-size: 0.9rem;
  color: #6c757d;
  margin: 0 0 20px 0;
}
.card-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #1d3557;
}
.price small {
  font-size: 0.8rem;
  font-weight: normal;
  color: #6c757d;
}
.btn-fav {
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  padding: 5px;
}
.btn-fav:hover {
  transform: scale(1.2);
}
</style>
