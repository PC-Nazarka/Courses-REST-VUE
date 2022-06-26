<template>
  <div>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label"
        >Название курса</label
      >
      <input
        type="text"
        class="form-control mb-2"
        placeholder="Введите название курса"
        v-model="this.course.name"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label"
        >Описание курса</label
      >
      <textarea
        class="form-control mb-2"
        placeholder="Введите описание курса"
        aria-label="With textarea"
        v-model="this.course.description"
      ></textarea>
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label"
        >Стоимость курса</label
      >
      <input v-model="this.course.price" type="number" class="form-control" />
    </div>
    <select
      v-model="this.course.category"
      class="form-select mb-3"
      aria-label="Default select example"
    >
      <option value="" selected disabled>Выберите категорию</option>
      <option
        v-for="category of this.categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
    <select
      v-model="this.course.status"
      class="form-select mb-3"
      aria-label="Default select example"
    >
      <option value="" selected disabled>Выберите статус</option>
      <option value="READY">Готовый</option>
      <option value="DRAFT">Черновик</option>
    </select>
    <div class="mb-3">
      <div v-if="$route.params.id && this.course.image">
        {{ this.course.image.slice(this.course.image.lastIndexOf("/") + 1) }}
        <br />
      </div>
      <label for="formFile" class="form-label">Лого курса</label>
      <input
        @change="this.getFile"
        class="form-control"
        type="file"
        id="formFile"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CourseCreate",
  props: {
    course: Object,
  },
  data() {
    return {
      categories: [],
      name: "",
      description: "",
      price: 0,
      category: "",
      image: null,
      status: "",
    };
  },
  methods: {
    getFile(e) {
      this.course.image = e.target.files[0];
    },

    async getCategories() {
      try {
        await this.$store.dispatch("setAccess");
        const response = await axios.get(
          this.$store.state.url + `categories/`,
          {
            headers: {
              Authorization: "JWT " + this.$store.state.access,
            },
          }
        );
        this.categories = response.data;
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
      }
    },
  },
  created() {
    this.getCategories();
  },
};
</script>

<style></style>
