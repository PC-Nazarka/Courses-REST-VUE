<template>
  <div class="card p-1 m-2" style="width: 18rem">
    <img :src="this.course.image" :img="course.name" class="p-3 card-img-top" />
    <div class="card-body">
      <h5 class="card-title">{{ course.name }}</h5>
      <div class="d-flex justify-content-between align-items-center flex-wrap">
        <i class="bi bi-star-fill">
          {{ Number(course.rating.toFixed(1)) }}
        </i>
        <i class="bi bi-person-fill">
          {{ course.students.length }}
        </i>
        <i class="bi bi-cash">
          {{ course.price }}
        </i>
      </div>
    </div>
    <button
      @click="$router.push({ name: 'Course', params: { id: course.id } })"
      class="btn btn-success"
    >
      Check
    </button>
  </div>
</template>

<script>
export default {
  name: "CourseItem",
  props: {
    course: Object,
  },
};
</script>
