<template>
  <div>
    <h1>Изменение пароля</h1>
    <div class="mb-3 row">
      <label for="inputPassword1" class="col-sm-2 col-form-label"
        >Новый пароль</label
      >
      <div class="col-sm-10">
        <input
          v-model="this.new_password"
          type="password"
          class="form-control"
          id="inputPassword1"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="inputPassword2" class="col-sm-2 col-form-label"
        >Повтор нового пароля</label
      >
      <div class="col-sm-10">
        <input
          v-model="this.re_new_password"
          type="password"
          class="form-control"
          id="inputPassword2"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="inputPassword" class="col-sm-2 col-form-label"
        >Старый пароль</label
      >
      <div class="col-sm-10">
        <input
          v-model="this.current_password"
          type="password"
          class="form-control"
          id="inputPassword"
        />
      </div>
    </div>
    <button @click="this.changePassword" class="btn btn-success">
      Изменить
    </button>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "ChangePasswordPage",
  data() {
    return {
      new_password: "",
      re_new_password: "",
      current_password: "",
    };
  },
  methods: {
    async changePassword() {
      try {
        await this.$store.dispatch("setAccess");
        await axios.post(
          this.$store.state.url + "auth/users/set_password/",
          {
            new_password: this.new_password,
            re_new_password: this.re_new_password,
            current_password: this.current_password,
          },
          {
            headers: {
              Authorization: "JWT " + this.$store.state.access,
            },
          }
        );
        alert("Пароль успешно сменен");
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
        await router.push({ name: "AccountInfo" });
      }
    },
  },
};
</script>

<style></style>
