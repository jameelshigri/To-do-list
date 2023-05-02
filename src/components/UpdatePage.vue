<template lang="">
  <NaveBar />
  <div class="todo-list">
    <h2>Update Task</h2>
    <form @submit.prevent="updateTask">
      <input
        type="text"
        name="task"
        placeholder="Enter new task..."
        v-model="newtask.task"
      />
      <input
        type="date"
        name="Date"
        placeholder="Enter Date..."
        v-model="newtask.selectedDate"
      />
      <input
        type="time"
        name="time"
        placeholder="Enter time..."
        v-model="newtask.selectedTime"
      />
      <button type="submit">Update Task</button>
    </form>
  </div>
</template>
<script>
import NaveBar from "./NaveBar.vue";
import axios from "axios";
export default {
  components: {
    NaveBar,
  },
  data() {
    return {
      newtask: {
        task: "",
        selectedDate: new Date(),
        selectedTime: new Date().toLocaleTimeString(),
      },
    };
  },
  methods: {
    async updateTask() {
      let result = await axios.put(
        "http://localhost:3000/tasks/" + this.$route.params.id,
        this.newtask
      );
      if (result.status === 200) {
        this.$router.push({ name: "Home" });
      }
    },
  },
  async mounted() {
    let res = await axios.get(
      "http://localhost:3000/tasks/" + this.$route.params.id
    );
    // console.log(res);
    this.newtask = res.data;
  },
};
</script>
<style lang=""></style>
