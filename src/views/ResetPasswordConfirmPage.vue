<template>
  <div class="container col-8 my-5">
    <h1>Введите новый пароль</h1>
    <div class="mb-3 row">
      <label for="inputPassword" class="col-sm-2 col-form-label">Пароль</label>
      <div class="col-sm-10">
        <input
          v-model="this.password"
          type="password"
          class="form-control"
          id="inputPassword"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="inputPassword" class="col-sm-2 col-form-label"
        >Повтор пароля</label
      >
      <div class="col-sm-10">
        <input
          v-model="this.re_password"
          type="password"
          class="form-control"
          id="inputPassword"
        />
      </div>
    </div>
    <button @click="this.resetPasswordConfirm" class="mt-3 btn btn-success">
      Сбросить пароль
    </button>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "ResetPasswordConfirmPage",
  data() {
    return {
      password: "",
      re_password: "",
    };
  },
  methods: {
    async resetPasswordConfirm() {
      try {
        await axios.post(
          this.$store.state.url + "auth/users/reset_password_confirm/",
          {
            uid: this.$route.params.uid,
            token: this.$route.params.token,
            new_password: this.password,
            re_new_password: this.re_password,
          }
        );
        this.isActivate = true;
        alert("Пароль успешно сменен");
        await this.$router.push({ name: "Main" });
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
      }
    },
  },
};
</script>
