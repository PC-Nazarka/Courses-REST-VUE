<template>
  <div class="row container" v-if="!courses.length">
    <h1>Курсы отсутствуют</h1>
    <div class="d-flex flex-wrap">
      <slot name="buttons"></slot>
    </div>
  </div>
  <div class="row container" v-else>
    <div class="d-flex flex-wrap">
      <slot name="buttons"></slot>
    </div>
    <course-item v-for="course in courses" :key="course.id" :course="course" />
  </div>
  <div ref="observer" class="observer"></div>
</template>

<script>
import CourseItem from "./CourseItem.vue";

export default {
  name: "ListCourses",
  emits: ["fetch"],
  components: {
    "course-item": CourseItem,
  },
  props: {
    courses: Array,
  },
  mounted() {
    var options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    var callback = (entries) => {
      if (entries[0].isIntersecting) {
        this.$emit("fetch");
      }
    };
    var observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
};
</script>
