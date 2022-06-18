<template>
  <div class="container-xxl">
    <list-courses :showFilter="this.showFilter" />
  </div>
</template>

<script>
import ListCourses from "@/components/ListCourses.vue";

export default {
  name: "MainPage",
  components: {
    "list-courses": ListCourses,
  },
  data() {
    return {
      showFilter: true,
    };
  },
};
</script>

<style></style>
