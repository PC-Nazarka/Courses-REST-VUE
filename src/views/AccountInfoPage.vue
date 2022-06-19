<template>
  <div>
    <div class="py-1">Никнейм: {{ this.user.username }}</div>
    <div class="py-1">Имя: {{ this.user.first_name }}</div>
    <div class="py-1">Фамилия: {{ this.user.last_name }}</div>
    <div class="py-1">Email: {{ this.user.email }}</div>
    <div class="py-1">Описание: {{ this.user.description }}</div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "AccountInfoPage",
  data() {
    return {
      is_me: false,
      user: {},
    };
  },
  methods: {
    async getUser(id) {
      try {
        await this.$store.dispatch("setAccess");
        const response = await axios.get(
          this.$store.state.url + `auth/users/${id}/`,
          {
            headers: {
              Authorization: "JWT " + this.$store.state.access,
            },
          }
        );
        this.user = response.data;
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
        await router.push({ name: "Main" });
      }
    },
  },
  created() {
    if (this.$route.params.id != this.$store.state.user.id) {
      this.is_me = false;
      this.getUser(this.$route.params.id);
    } else {
      this.is_me = true;
      this.user = this.$store.state.user;
    }
  },
};
</script>

<style></style>
