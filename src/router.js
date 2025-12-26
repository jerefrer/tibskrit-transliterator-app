import { createRouter, createWebHistory } from "vue-router";
import Compare from "./pages/Compare.vue";
import Convert from "./pages/Convert.vue";
import Tests from "./pages/Tests.vue";

const routes = [
  { path: "/", name: "convert", component: Convert },
  { path: "/compare", name: "compare", component: Compare },
  { path: "/tests", name: "tests", component: Tests },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
