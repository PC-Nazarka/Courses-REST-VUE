<template>
  <div class="container">
    <div v-if="this.isActivate">
      <h1>Поздравляем!</h1>
      <p>Ваш аккаунт успешно активирован</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ActivateAccount",
  data() {
    return {
      isActivate: false,
    };
  },
  methods: {
    async activateAccount() {
      try {
        await axios.post(this.$store.state.url + "auth/users/activation/", {
          uid: this.$route.params.uid,
          token: this.$route.params.token,
        });
        this.isActivate = true;
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
        alert("Ошибка активации акканута");
      }
    },
  },
  created() {
    this.activateAccount();
  },
};
</script>
