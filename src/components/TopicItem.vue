<template>
  <li class="list-group-item mb-3">
    <div class="dropdown">
      <button
        class="btn"
        type="button"
        id="dropdownMenuButton2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <h6>&hellip;</h6>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
        <li>
          <button
            @click="$emit('edit', topic)"
            class="dropdown-item"
            data-bs-toggle="modal"
            data-bs-target="#modelEdit"
            type="button"
          >
            Изменить
          </button>
        </li>
        <li>
          <button
            @click="$emit('remove', topic)"
            class="dropdown-item"
            type="button"
          >
            Удалить
          </button>
        </li>
      </ul>
    </div>
    <div class="w-100">
      <textarea class="form-control" v-model="topic.title" readonly></textarea>
    </div>
  </li>
</template>

<script>
export default {
  name: "TopicItem",
  props: {
    topic: Object,
  },
};
</script>

<style scoped>
.list-group-item {
  display: flex;
  flex-direction: row;
}

.h5 {
  margin: 0px;
}

.list-group-item {
  margin-bottom: 10px;
}
</style>
