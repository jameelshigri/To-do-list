<template lang="">
  <div class="container">
    <h5>Sign-in</h5>
    <input
      type="text"
      name="email"
      placeholder="Enter Email"
      required
      v-model="email"
      :class="`${errors.email ? 'is-invalid' : ''}`"
    />
    <div class="is-invalid">{{ errors.email }}</div>

    <input
      type="password"
      name="password"
      placeholder="Enter Password"
      v-model="password"
      :class="`${errors.password ? 'is-invalid' : ''}`"
    />
    <div class="is-invalid">{{ errors.password }}</div>

    <button type="submit" v-on:click="validateSingnIn()">Login</button>
    <router-link to="/signup">
      Register
    </router-link>
  </div>
</template>
<script>
import axios from "axios";
import validateRegisterInput from "../validations/validateRegisterInput";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      errors: {},
    };
  },
  methods: {
    validateSingnIn() {
      let data = {
        name: "null",
        email: this.email,
        password: this.password,
      };
      const { isInvalid, errors } = validateRegisterInput(data);
      if (isInvalid) {
        this.errors = errors;
      } else {
        this.errors = {};
        this.singnin();
      }
    },
    async singnin() {
      let res = await axios.get(
        `http://localhost:3000/user?email=${this.email}&password=${this.password}`
      );
      if (res.status == 200 && res.data.length > 0) {
        localStorage.setItem("user-info", JSON.stringify(res.data[0]));
        this.$router.push({ name: "Home" });
      } else {
        alert("user not found");
      }
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>
