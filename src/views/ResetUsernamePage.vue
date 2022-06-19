<template>
  <div class="container col-6 my-5">
    <h1>Сброс username</h1>
    <label for="exampleFormControlInput1" class="form-label">Email</label>
    <input
      type="email"
      class="form-control"
      id="exampleFormControlInput1"
      placeholder="Введите email для отправки письма"
      v-model="this.email"
    />
    <button @click="this.resetUsername" class="mt-3 btn btn-success">Сбросить username</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ResetUsernamePage",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async resetUsername() {
      try {
        await axios.post(this.$store.state.url + "auth/users/reset_username/", {
          email: this.email,
        });
        alert("На указанную почту отправлено сообщение со сбросом username")
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
