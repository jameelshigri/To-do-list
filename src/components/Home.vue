<template>
  <NaveBar />
  <div class="todo-list">
    <h2>Todo List</h2>
    <ul>
      <li v-for="(tasks, id) in tasks" :key="id">
        <span
          ><h3>
            {{ tasks.task }}
          </h3>
          <br />
          <h6>{{ tasks.selectedDate }}&nbsp;{{ tasks.selectedTime }}</h6>
        </span>
        <span class="actions">
          <router-link :to="'/edit/' + tasks.id" class="edit">Edit</router-link>
          <button @click="deleteTask(tasks.id)">Delete</button>
        </span>
      </li>
    </ul>
    <form @submit.prevent="addTask">
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
      <button type="submit">Add Task</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import NaveBar from "./NaveBar.vue";
export default {
  name: "Home",
  components: {
    NaveBar,
  },
  data() {
    return {
      tasks: [],
      newtask: {
        task: "",
        selectedDate: new Date(),
        selectedTime: new Date().toLocaleTimeString(),
      },
    };
  },

  methods: {
    addTask() {
      axios
        .post("http://localhost:3000/tasks", this.newtask)
        .then((response) => {
          this.tasks.push(response.data);
          this.newtask = {
            task: "",
            selectedDate: "",
            selectedTime: "",
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deleteTask(id) {
      console.log(id);
      let result = await axios.delete("http://localhost:3000/tasks/" + id);
      if (result.status === 200) {
        this.fetchData();
      }
    },

    async fetchData() {
      let res = await axios.get("http://localhost:3000/tasks");
      this.tasks = res.data;
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "SignupPage" });
    }
    this.fetchData();
  },
};
</script>
<style scoped></style>
