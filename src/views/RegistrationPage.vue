<template>
  <div class="container col-8 my-5">
    <h1>Регистрация</h1>
    <div class="mb-3 row">
      <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input
          v-model="this.email"
          type="email"
          class="form-control"
          id="inputEmail"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="inputUsername" class="col-sm-2 col-form-label"
        >Username</label
      >
      <div class="col-sm-10">
        <input
          v-model="this.username"
          type="text"
          class="form-control"
          id="inputUsername"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="inputFirstName" class="col-sm-2 col-form-label">Имя</label>
      <div class="col-sm-10">
        <input
          v-model="this.first_name"
          type="text"
          class="form-control"
          id="inputFirstName"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="inputSecondName" class="col-sm-2 col-form-label"
        >Фамилия</label
      >
      <div class="col-sm-10">
        <input
          v-model="this.second_name"
          type="text"
          class="form-control"
          id="inputSecondName"
        />
      </div>
    </div>
    <div class="mb-3 row">
      <label for="exampleFormControlTextarea1" class="col-sm-2 col-form-label"
        >Описания</label
      >
      <div class="col-sm-10">
        <textarea
          v-model="this.description"
          placeholder="Расскажите о себе"
          class="form-control"
          id="exampleFormControlTextarea1"
        ></textarea>
      </div>
    </div>
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
      <label for="inputRepeatPassword" class="col-sm-2 col-form-label"
        >Повтор пароля</label
      >
      <div class="col-sm-10">
        <input
          v-model="this.re_password"
          type="password"
          class="form-control"
          id="inputRepeatPassword"
        />
      </div>
    </div>
    <button @click="this.resigrationUser" class="btn btn-success">
      Регистрация
    </button>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "RegistrationPage",
  data() {
    return {
      email: "",
      username: "",
      first_name: "",
      second_name: "",
      description: "",
      password: "",
      re_password: "",
    };
  },
  methods: {
    async resigrationUser() {
      try {
        await axios.post(this.$store.state.url + "auth/users/", {
          username: this.username,
          first_name: this.first_name,
          last_name: this.second_name,
          password: this.password,
          re_password: this.re_password,
          email: this.email,
          description: this.description,
        });
        alert(
          "Для завершения регистрации пройдите по ссылке, присланной вам на указанный email"
        );
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
};
</script>
