<template>
  <div class="container py-5">
    <div class="mb-3">
      <label class="form-label">Username</label>
      <input v-model="this.username" type="text" class="form-control" />
    </div>
    <div class="mb-3">
      <label class="form-label">Пароль</label>
      <input v-model="this.password" type="password" class="form-control" />
    </div>
    <button @click="this.deleteAccount" class="btn btn-danger me-3">
      Удалить аккаунт
    </button>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "DeleteAccount",
  data() {
    return {
      password: "",
      username: "",
      currentUser: Object(),
    };
  },
  props: {
    user: Object,
  },
  methods: {
    async deleteAccount(event) {
      event.preventDefault();
      try {
        await this.$store.dispatch("setAccess");
        await axios.delete(this.$store.state.url + `auth/users/me/`, {
          data: {
            username: this.username,
            password: this.password,
            description: this.user.description,
            courses_student: this.user.courses_student,
            pass_courses: this.user.pass_courses,
            favorite_courses: this.user.favorite_courses,
            want_pass_courses: this.user.want_pass_courses,
            archive_courses: this.user.archive_courses,
            courses: this.user.courses,
          },
          headers: {
            Authorization: "JWT " + this.$store.state.access,
          },
        });
        this.$store.commit("setAccess", "");
        this.$store.commit("setRefresh", "");
        this.$store.commit("setUserId", -1);
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

<style scoped></style>
