<template>
  <div class="container col-8 my-5">
    <h1>Вход</h1>
    <div class="mb-3 row">
      <label for="staticEmail" class="col-sm-2 col-form-label">Username</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" v-model="this.username" />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="inputPassword" class="col-sm-2 col-form-label">Пароль</label>
      <div class="col-sm-10">
        <input
          type="password"
          class="form-control"
          id="inputPassword"
          v-model="this.password"
        />
      </div>
    </div>
    <div class="buttons">
      <button class="btn btn-success" @click="this.login">Войти</button>
      <button
        class="btn btn-success mx-3"
        @click="$router.push({ name: 'Registration' })"
      >
        Регистрация
      </button>
      <router-link class="pe-3" :to="{ name: 'ResetPassword' }"
        >Забыли пароль?</router-link
      >
      <router-link :to="{ name: 'ResetUsername' }"
        >Забыли username?</router-link
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login(event) {
      event.preventDefault();
      try {
        const response = await axios.post(
          this.$store.state.url + "auth/jwt/create/",
          {
            username: this.username,
            password: this.password,
          }
        );
        this.$store.commit("setAccess", response.data.access);
        this.$store.commit("setRefresh", response.data.refresh);
        this.$store.dispatch("setUser");
        await router.push({ name: "Main" });
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
      }
    },
  },
  async created() {
    if (this.$store.state.access !== "") {
      await router.push({ name: "Main" });
    }
  },
};
</script>
