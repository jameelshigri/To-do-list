<template>
  <div class="container">
    <h5>Signup</h5>
    <input
      type="text"
      name="name"
      placeholder="Enter Name"
      v-model="name"
      :class="`${errors.name ? 'is-invalid' : ''}`"
    />
    <div class="is-invalid">{{ errors.name }}</div>
    <input
      type="text"
      name="email"
      placeholder="Enter Email"
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

    <button type="submit" v-on:click="validateSubmit()">Signup</button>
    <p>Already Have an account?</p>
    <router-link to="/signin">
      Login
    </router-link>
  </div>
</template>
<script>
import axios from "axios";
import validateRegisterInput from "../validations/validateRegisterInput";
export default {
  name: "SignupPage",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errors: {},
    };
  },
  methods: {
    validateSubmit() {
      let user = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      const { isInvalid, errors } = validateRegisterInput(user);
      if (isInvalid) {
        this.errors = errors;
      } else {
        this.errors = {};
        this.singnup();
      }
    },
    async singnup() {
      // console.log("clall");
      let res = await axios.post("http://localhost:3000/user", {
        name: this.name,
        email: this.email,
        password: this.password,
      });
      if (res.status == 201) {
        // alert("Registration successful");
        localStorage.setItem("user-info", JSON.stringify(res.data));
        this.$router.push({ name: "Home" });
      } else if (res.status == 0) {
        alert("DB offline");
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
