<template>
  <div>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Имя</label>
      <input
        v-model="this.first_name"
        type="text"
        class="form-control"
        id="exampleFormControlInput1"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Фамилия</label>
      <input
        v-model="this.second_name"
        type="text"
        class="form-control"
        id="exampleFormControlInput1"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label"
        >Описание</label
      >
      <textarea
        v-model="this.description"
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
      ></textarea>
    </div>
    <button @click="this.editAccountInfo" class="btn btn-success">
      Изменить
    </button>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "EditAccountPage",
  data() {
    return {
      first_name: "",
      second_name: "",
      description: "",
    };
  },
  methods: {
    async editAccountInfo() {
      try {
        await this.$store.dispatch("setAccess");
        await axios.patch(
          this.$store.state.url + "auth/users/me/",
          {
            first_name: this.first_name,
            last_name: this.second_name,
            description: this.description,
          },
          {
            headers: {
              Authorization: "JWT " + this.$store.state.access,
            },
          }
        );
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
        await router.push({ name: "Main" });
      }
    },
  },
  created() {
    this.first_name = this.$store.state.user.first_name;
    this.second_name = this.$store.state.user.last_name;
    this.description = this.$store.state.user.description;
  },
};
</script>

<style></style>
