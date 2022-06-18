<template>
  <div class="row">
    <filter-panel @search="this.search" v-show="this.showFilter" />
    <course-item
      v-for="course in this.courses"
      :key="course.id"
      :course="course"
    />
  </div>
  <div ref="observer" class="observer"></div>
</template>

<script>
import axios from "axios";
import CourseItem from "./CourseItem.vue";
import FilterPanel from "@/components/FilterPanel.vue";

export default {
  name: "ListCourses",
  components: {
    "course-item": CourseItem,
    "filter-panel": FilterPanel,
  },
  props: {
    showFilter: Boolean,
  },
  data() {
    return {
      courses: [],
      next: "",
      page: 1,
    };
  },
  methods: {
    async fetchCourses(query = null) {
      try {
        let url = new URL(this.$store.state.url + "courses/");
        if (query) {
          for (let [key, value] of Object.entries(query)) {
            if (value !== "") {
              url.searchParams.set(key, value);
            }
          }
        }
        url.searchParams.set("page", this.page);
        const response = await axios.get(url.href);
        this.courses =
          this.page === 1
            ? response.data.results
            : [...this.courses, ...response.data.results];
        this.next = response.data.links.next;
        if (this.page < response.data.total_pages) {
          this.page++;
        }
      } catch (e) {
        alert("Ошибка получения курсов");
      }
    },
    search(query) {
      this.fetchCourses(query);
    },
  },
  mounted() {
    this.fetchCourses();
    var options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    var callback = (entries) => {
      if (entries[0].isIntersecting) {
        this.fetchCourses();
      }
    };
    var observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
};
</script>
