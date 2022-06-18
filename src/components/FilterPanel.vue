<template>
  <form class="d-flex justify-content-center mt-3">
    <div class="row align-items-center">
      <div class="col-6">
        <div class="input-group">
          <span class="input-group-text" id="basic-addon1"
            ><i class="bi bi-search"></i
          ></span>
          <input
            type="email"
            placeholder="Название курса"
            class="form-control"
            v-model="this.searchQuery"
            @input="this.searchCourses"
          />
        </div>
      </div>
      <div class="col">
        <select
          class="form-select"
          name="category"
          v-model="this.selectCategory"
          @change="this.searchCourses"
        >
          <option value="" disabled>Выберите категорию</option>
          <option
            v-for="category in this.categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="col">
        <button
          @click="this.searchCourses"
          type="submit"
          class="btn btn-success"
        >
          Найти
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "FilterPanel",
  data() {
    return {
      categories: {},
      selectCategory: "",
      searchQuery: "",
    };
  },
  methods: {
    async featchCategories() {
      try {
        const response = await axios.get(this.$store.state.url + "categories/");
        this.categories = response.data.results;
      } catch (e) {
        alert("Ошибка получения категорий");
      }
    },
    searchCourses(event) {
      event.preventDefault();
      let query = {};
      if (this.selectCategory) {
        query["category"] = this.selectCategory
      }
      if (this.searchQuery) {
        query["search"] = this.searchQuery
      }
      this.$emit("search", query)
    },
  },
  mounted() {
    this.featchCategories();
  },
};
</script>