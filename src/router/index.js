import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CountryDetails from "../views/CountryDetails.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/countries/:name",
    name: "CountryDetails",
    component: CountryDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
