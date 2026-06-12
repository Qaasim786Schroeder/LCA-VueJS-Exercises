<template>
  <div
    style="
      max-width: 800px;
      margin: 20px auto;
      font-family: sans-serif;
      padding: 20px;
    "
  >
    <h2>FlexZone Fitness Scheduler</h2>

    <form
      @submit.prevent="addSession"
      style="
        background: #f4f4f4;
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 20px;
      "
    >
      <h3>Add New Class</h3>
      <div style="margin-bottom: 10px">
        <label>Class Name: </label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Yoga, Spinning..."
          required
        />
      </div>
      <div style="margin-bottom: 10px">
        <label>Coach: </label>
        <input
          v-model="form.coach"
          type="text"
          placeholder="Coach John..."
          required
        />
      </div>
      <div style="margin-bottom: 10px">
        <label>Date: </label>
        <input v-model="form.date" type="date" required />
      </div>
      <div style="margin-bottom: 10px">
        <label>Time: </label>
        <input v-model="form.time" type="time" required />
      </div>
      <div style="margin-bottom: 10px">
        <label>Capacity: </label>
        <input v-model.number="form.capacity" type="number" min="1" required />
      </div>

      <p v-if="error" style="color: red">{{ error }}</p>
      <button
        type="submit"
        style="
          background: blue;
          color: white;
          padding: 8px 15px;
          border: none;
          cursor: pointer;
        "
      >
        Add Session
      </button>
    </form>

    <div style="margin-bottom: 20px">
      <input
        v-model="search"
        type="text"
        placeholder="Filter by coach name..."
        style="padding: 5px; width: 200px"
      />
      <span style="margin-left: 20px; font-weight: bold"
        >Total Classes: {{ totalClasses }}</span
      >
    </div>

    <h3>Scheduled Classes</h3>
    <div
      v-if="filteredSessions.length === 0"
      style="padding: 20px; background: #eee; text-align: center"
    >
      No sessions scheduled.
    </div>

    <div v-else>
      <div
        v-for="item in filteredSessions"
        :key="item.id"
        style="
          border: 1px solid #ccc;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div>
          <h4>{{ item.name }}</h4>
          <p>
            Coach: {{ item.coach }} | Date: {{ item.date }} | Time:
            {{ item.time }} | Max: {{ item.capacity }}
          </p>
        </div>
        <button
          @click="deleteSession(item.id)"
          style="
            background: red;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
          "
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sessions: JSON.parse(localStorage.getItem("sessions")) || [],
      search: "",
      error: "",
      form: { name: "", coach: "", date: "", time: "", capacity: "" },
    };
  },
  computed: {
    totalClasses() {
      return this.sessions.length;
    },
    filteredSessions() {
      return this.sessions.filter((s) =>
        s.coach.toLowerCase().includes(this.search.toLowerCase()),
      );
    },
  },
  methods: {
    addSession() {
      if (
        !this.form.name ||
        !this.form.coach ||
        !this.form.date ||
        !this.form.time ||
        !this.form.capacity
      ) {
        this.error = "All fields are required!";
        return;
      }
      this.sessions.push({
        id: Date.now(),
        ...this.form,
      });
      localStorage.setItem("sessions", JSON.stringify(this.sessions));
      this.form = { name: "", coach: "", date: "", time: "", capacity: "" };
      this.error = "";
    },
    deleteSession(id) {
      this.sessions = this.sessions.filter((s) => s.id !== id);
      localStorage.setItem("sessions", JSON.stringify(this.sessions));
    },
  },
};
</script>
