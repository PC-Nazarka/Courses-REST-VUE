import { createStore } from "vuex";
import axios from "axios";
import router from "../router";

const store = createStore({
  state: {
    url: "http://0.0.0.0:8000/api/v1/",
    access: localStorage.access ? localStorage.access : "",
    refresh: localStorage.refresh ? localStorage.refresh : "",
    user_id: Number(localStorage.user_id) ? Number(localStorage.user_id) : -1,
  },
  mutations: {
    setAccess(state, access) {
      state.access = access;
      localStorage.setItem("access", access);
    },
    setRefresh(state, refresh) {
      state.refresh = refresh;
      localStorage.setItem("refresh", refresh);
    },
    setUserId(state, user_id) {
      state.user_id = user_id;
      localStorage.setItem("user_id", user_id);
    },
  },
  actions: {
    async setUser({ commit, state }) {
      if (state.access === "" && state.refresh === "") {
        await router.push({ name: "Login" });
        return;
      }
      try {
        const response = await axios.get(state.url + "auth/users/me/", {
          headers: {
            Authorization: "JWT " + state.access,
          },
        });
        commit("setUserId", response.data.id);
      } catch (e) {
        await router.push({ name: "Login" });
      }
    },
    async setAccess({ commit, state, dispatch }) {
      if (state.access === "" && state.refresh === "") {
        await router.push({ name: "Login" });
        return;
      }
      try {
        await axios.post(state.url + "auth/jwt/verify/", {
          token: state.access,
        });
        dispatch("setUser");
      } catch (error) {
        if (error.response.status === 401) {
          try {
            const response_refresh = await axios.post(
              state.url + "auth/jwt/refresh/",
              {
                refresh: state.refresh,
              }
            );
            commit("setAccess", response_refresh.data.access);
            dispatch("setAccess");
          } catch (e) {
            commit("setRefresh", "");
            commit("setAccess", "");
            commit("setUserId", -1);
            await router.push({ name: "Main" });
          }
        }
      }
    },
  },
});

export default store;
