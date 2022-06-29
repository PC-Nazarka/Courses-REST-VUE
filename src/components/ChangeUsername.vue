<template>
  <div>
    <h1>Изменение username</h1>
    <div class="mb-3 row">
      <label for="inputUsername1" class="col-sm-2 col-form-label"
        >Новый username</label
      >
      <div class="col-sm-10">
        <input
          v-model="this.new_username"
          type="text"
          class="form-control"
          id="inputUsername1"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="inputUsername2" class="col-sm-2 col-form-label"
        >Повтор нового username</label
      >
      <div class="col-sm-10">
        <input
          v-model="this.re_new_username"
          type="text"
          class="form-control"
          id="inputUsername2"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="inputPassword" class="col-sm-2 col-form-label">Пароль</label>
      <div class="col-sm-10">
        <input
          v-model="this.current_password"
          type="password"
          class="form-control"
          id="inputPassword"
        />
      </div>
    </div>
    <button @click="this.changeUsername" class="btn btn-success">
      Изменить
    </button>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "ChangeUsernamePage",
  data() {
    return {
      new_username: "",
      re_new_username: "",
      current_password: "",
    };
  },
  methods: {
    async changeUsername() {
      try {
        await this.$store.dispatch("setAccess");
        await axios.post(
          this.$store.state.url + "auth/users/set_username/",
          {
            new_username: this.new_username,
            re_new_username: this.re_new_username,
            current_password: this.current_password,
          },
          {
            headers: {
              Authorization: "JWT " + this.$store.state.access,
            },
          }
        );
        alert("Username успешно сменен");
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
        await this.$router.push({ name: "AccountInfo" });
      }
    },
  },
};
</script>

<style></style>
