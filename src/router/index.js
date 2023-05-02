import { createRouter, createWebHistory } from "vue-router";
import SignupPage from "../components/SignupPage.vue";
import Home from "../components/Home.vue";
import LoginPage from "../components/LoginPage.vue";
import UpdatePage from "../components/UpdatePage.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "SignupPage",
    component: SignupPage,
  },
  {
    path: "/signin",
    name: "signin",
    component: LoginPage,
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: UpdatePage,
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
