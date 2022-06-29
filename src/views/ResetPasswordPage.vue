<template>
  <div class="container col-6 my-5">
    <h1>Сброс пароля</h1>
    <label for="exampleFormControlInput1" class="form-label">Email</label>
    <input
      type="email"
      class="form-control"
      id="exampleFormControlInput1"
      v-model="this.email"
      placeholder="Введите email для отправки письма"
    />
    <button @click="this.resetPassword" class="mt-3 btn btn-success">
      Сбросить пароль
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ResetPasswordPage",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async resetPassword() {
      try {
        await axios.post(this.$store.state.url + "auth/users/reset_password/", {
          email: this.email,
        });
        alert("На указанную почту отправлено сообщение со сбросом пароля");
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

<style></style>
