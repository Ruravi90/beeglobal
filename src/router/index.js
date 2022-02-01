import Vue from "vue";
import VueRouter from "vue-router";
import TheConteiner from "../conteiners/TheConteiner.vue";
import Beeglobal from "../views/Beeglobal.vue";
import NotFound from "../views/NotFound.vue";

import TheConteinerSettings from "../conteiners/TheConteinerSettings.vue";
import CatalogsMatter from "../views/CatalogsMatter.vue";
import Clients from "../views/Clients.vue";
import Profile from "../views/Profile.vue";
import Roles from "../views/Roles.vue";
import Teams from "../views/Teams.vue";
import TemplatesMatter from "../views/TemplatesMatter.vue";
import Users from "../views/Users.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/beeglobal",
    name: "Home",
    component: TheConteiner,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "beeglobal/:idMatter?",
        name: "Beeglobal",
        component: Beeglobal,
        props: true
      }
    ],
  },
  {
    path: "/settings",
    redirect: "/profile",
    name: "Settings",
    component: TheConteinerSettings,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "profile/",
        name: "Profile",
        component: Profile,
        props: true
      },
      {
        path: "cat-matter/",
        name: "Catalogs",
        component: CatalogsMatter,
        props: true
      },
      {
        path: "clients/",
        name: "Clients",
        component: Clients,
        props: true
      },
      {
        path: "roles/",
        name: "Roles",
        component: Roles,
        props: true
      },
      {
        path: "template-matter/",
        name: "Templates",
        component: TemplatesMatter,
        props: true
      },
      {
        path: "teams/",
        name: "Teams",
        component: Teams,
        props: true
      },
      {
        path: "users/",
        name: "Users",
        component: Users,
        props: true
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../auth/Login.vue"),
  },
  {
    path: "/logout",
    name: "Logout",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../auth/Logout.vue"),
  },
  {
    path: "/singup",
    name: "Singup",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../auth/Singup.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
