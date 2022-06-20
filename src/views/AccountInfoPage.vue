<template>
  <div class="row container">
    <div class="py-1">Никнейм: {{ user.username }}</div>
    <div class="py-1">Имя: {{ user.first_name }}</div>
    <div class="py-1">Фамилия: {{ user.last_name }}</div>
    <div class="py-1">Email: {{ user.email }}</div>
    <div class="py-1">Описание: {{ user.description }}</div>
  </div>
</template>

<script>
export default {
  name: "AccountInfoPage",
  props:{
    user: Object,
  }
};
</script>

<style></style>
