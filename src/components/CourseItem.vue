<template>
  <div class="card m-3 col-3">
    <img :src="this.course.image" class="p-3 card-img-top" />
    <div class="card-body">
      <h5 class="card-title">{{ course.name }}</h5>
      <div class="d-flex justify-content-between align-items-center">
        <i class="bi bi-star-fill">
          <span class="ms-1">{{ course.rating }}</span>
        </i>
        <i class="bi bi-person-fill">
          <span class="ms-1">
            {{ course.students.length }}
          </span>
        </i>
        <i class="bi bi-cash">
          <span class="ms-1">
            {{ course.price }}
          </span>
        </i>
      </div>
      <button
        @click="$router.push({ name: 'Course', params: { id: course.id } })"
        class="btn btn-success"
      >
        Check
      </button>
    </div>
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
