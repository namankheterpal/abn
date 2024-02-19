import { createRouter, createWebHistory } from "vue-router";
import ShowsView from "@/views/ShowsView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "shows",
      component: ShowsView,
    },
    {
      path: "/show/:id",
      name: "showDetails",
      component: () => import("../views/ShowsDetailsView.vue"),
      props: true,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

export default router;
