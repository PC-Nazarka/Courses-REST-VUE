<template>
  <div class="container">
    <list-courses :courses="this.courses" @fetch="this.fetchCourses" />
  </div>
</template>

<script>
import axios from "axios";
import ListCourses from "@/components/ListCourses.vue";

export default {
  name: "MainPage",
  components: {
    "list-courses": ListCourses,
  },
  data() {
    return {
      courses: [],
      next: "",
      page: 1,
      total_count_pages: 0,
    };
  },
  methods: {
    async fetchCourses() {
      if (this.page !== this.total_count_pages) {
        try {
          let url = new URL(this.$store.state.url + "courses/");
          url.searchParams.set("page", this.page);
          const response = await axios.get(url.href);
          this.courses =
            this.page === 1
              ? response.data.results
              : [...this.courses, ...response.data.results];
          this.next = response.data.links.next;
          this.total_count_pages = response.data.total_pages;
          if (this.page < response.data.total_pages) {
            this.page++;
          }
        } catch (e) {
          alert("Ошибка получения курсов");
        }
      }
    },
  },
  mounted() {
    this.fetchCourses();
  },
};
</script>

<style></style>
