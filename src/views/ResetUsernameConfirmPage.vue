<template>
  <div class="container col-8 my-5">
    <h1>Введите новый username</h1>
    <div class="mb-3 row">
      <label for="inputPassword" class="col-sm-2 col-form-label"
        >Username</label
      >
      <div class="col-sm-10">
        <input
          v-model="this.username"
          type="text"
          class="form-control"
          id="inputPassword"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="inputPassword" class="col-sm-2 col-form-label"
        >Повтор username</label
      >
      <div class="col-sm-10">
        <input
          v-model="this.re_username"
          type="text"
          class="form-control"
          id="inputPassword"
        />
      </div>
    </div>
    <button @click="this.resetUsernameConfirm" class="mt-3 btn btn-success">
      Сбросить username
    </button>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "ResetUsernameConfirmPage",
  data() {
    return {
      username: "",
      re_username: "",
    };
  },
  methods: {
    async resetUsernameConfirm() {
      try {
        await axios.post(
          this.$store.state.url + "auth/users/reset_username_confirm/",
          {
            uid: this.$route.params.uid,
            token: this.$route.params.token,
            new_username: this.username,
            re_new_username: this.re_username,
          }
        );
        this.isActivate = true;
        alert("Username успешно сменен");
        router.push({ name: "Main" });
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