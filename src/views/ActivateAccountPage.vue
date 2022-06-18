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
        alert("Ошибка получения данных о другом юзере");
      }
    },
  },
  created() {
    this.activateAccount();
  },
};
</script>
