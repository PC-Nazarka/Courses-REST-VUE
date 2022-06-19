<template>
  <div class="container col-10 my-5">
    <router-view></router-view>
    <div class="pt-3" v-if="this.is_me">
      <button
        class="btn btn-success me-3"
        @click="
          $router.push({
            name: 'EditAccount',
          })
        "
      >
        Редактирование аккаунта
      </button>
      <button
        class="btn btn-success me-3"
        @click="
          $router.push({
            name: 'ChangeUsername',
          })
        "
      >
        Смена username
      </button>
      <button
        class="btn btn-success me-3"
        @click="
          $router.push({
            name: 'ChangePassword',
          })
        "
      >
        Смена пароля
      </button>
            <button
        class="btn btn-danger me-3"
        @click="
          $router.push({
            name: 'DeleteAccount',
          })
        "
      >
        Удаление аккаунта
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountPage",
  data() {
    return {
      is_me: false,
    };
  },
  created() {
    this.is_me = this.$route.params.id == this.$store.state.user.id;
  },
};
</script>
