import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
//import "./hubs/question-hub";

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import VueFileAgent from 'vue-file-agent';
import 'vue-file-agent/dist/vue-file-agent.css';
Vue.use(VueFileAgent);

import vueAnkaCropper from 'vue-anka-cropper';
import 'vue-anka-cropper/dist/VueAnkaCropper.css';
Vue.use(vueAnkaCropper);

import VueTableDynamic from 'vue-table-dynamic';
Vue.use(VueTableDynamic);

import VueMaterial from "vue-material";
Vue.use(VueMaterial);

Vue.material.locale.dateFormat = "dd/MM/yyyy";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(Loading);

Vue.prototype.$primevue = {ripple: true};

import 'primeflex/primeflex.scss';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/nova/theme.css';
import 'primeicons/primeicons.css';

import button from 'primevue/button';
import dialog from 'primevue/dialog';
import inputText from 'primevue/inputtext';
import tooltip from 'primevue/tooltip';
import contextmenu from 'primevue/contextmenu';
import menu from 'primevue/menu';
import checkbox from 'primevue/checkbox';

Vue.component("Button",button);
Vue.component("Dialog",dialog);
Vue.component("InputText",inputText);
Vue.use('Tooltip', tooltip);
Vue.component("Contextmenu",contextmenu);
Vue.component("Menu",menu);
Vue.component("Checkbox",checkbox);

import Notifications from "vue-notification";
import velocity from "velocity-animate";
Vue.use(Notifications, { velocity });

import VueMoment from "vue-moment";
Vue.use(VueMoment);

var VueDragula = require("vue-dragula");
Vue.use(VueDragula);



Vue.config.productionTip = false;

// Setup axios as the Vue default $http library
axios.defaults.baseURL = store.state.api,
Vue.prototype.$http = axios;

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next("login");
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

