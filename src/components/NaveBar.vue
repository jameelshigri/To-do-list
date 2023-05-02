<template>
  <div class="navbar">
    <img src="" alt="" />
    <ul>
      <router-link to="/">
        <li>Home</li>
      </router-link>
      <li>
        <img
          src="../assets/logo.svg"
          alt=""
          style="
            height: 25px;
            width: 25px;
            border-radius: 50px;
            border: 1px solid white;
            margin: 5px;
            margin-top: 9px;
          "
        />
        {{ username }}
      </li>
      <li v-on:click="logout()">logout</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      username: "",
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "signin" });
    },
    // test() {
    //   console.log(this.dataProp.username);
    // },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    this.username = JSON.parse(user).name;
  },
};
</script>

<style scoped></style>
