import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api : "http://beeglobal.softether.net:82/odata/",
    urlHub:"http://beeglobal.softether.net:82",
    hubConnection : null,
    hubProxyNotification :  null,
    hubProxyTask :  null,
    token: localStorage.getItem("access_token") || null,
    User: JSON.parse(localStorage.getItem("_User")) || null,
    Responsibles: JSON.parse(localStorage.getItem("_Responsibles")) || null,
    headers: {
      Authorization: localStorage.getItem("access_token") || null,
    },
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    },
    getUser(state) {
      return state.User !== null;
    }
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token;
    },
    destroyToken(state) {
      state.token = null;
    },
  },
  actions: {
    retrieveToken(context, credentials) {
      const url = "/UsersClient/Login";
      const data = {
        UserName: credentials.username,
        Password: credentials.password,
        Email: credentials.username,
      };

      return new Promise((resolve, reject) => {
        axios
          .post(url, data, {
            headers: context.state.headers,
          })
          .then((response) => {
            localStorage.setItem(
              "access_token",
              "Bearer " + response.data.User.Token
            );
            localStorage.setItem("_User", JSON.stringify(response.data.User));
            context.commit("retrieveToken", response.data.User.Token);
            resolve(response);
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },
    destroyToken(context) {
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios
            .post(this.$apiURI + "api/logout", "", {
              headers: context.state.headers,
            })
            .then((response) => {
              //console.log(response)
              localStorage.removeItem("access_token");
              context.commit("destroyToken");

              resolve(response);
            })
            .catch((error) => {
              //console.log(error)
              localStorage.removeItem("access_token");
              context.commit("destroyToken");

              reject(error);
            });
        });
      }
    },
  },
  modules: {},
});
