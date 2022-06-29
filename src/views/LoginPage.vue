<template>
  <div class="container col-4 my-5">
    <h1>Вход</h1>
    <div class="mb-3 row">
      <label class="col-sm-2 col-form-label me-2">Username</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" v-model="this.username" />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="inputPassword" class="col-sm-2 col-form-label me-2"
        >Пароль</label
      >
      <div class="col-sm-10">
        <input
          type="password"
          class="form-control"
          id="inputPassword"
          v-model="this.password"
        />
      </div>
    </div>
    <div class="btn-toolbar mb-3" role="toolbar">
      <button class="btn btn-success me-2" type="button" @click="this.login">
        Войти
      </button>
      <button
        class="btn btn-success me-2"
        type="button"
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
    async login() {
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
        await this.$router.push({ name: "Main" });
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
      }
    },
    enterKey(e) {
      if (e.key === "Enter") {
        this.login();
      }
    },
  },
  mounted() {
    window.addEventListener("keydown", this.enterKey);
  },
};
</script>
