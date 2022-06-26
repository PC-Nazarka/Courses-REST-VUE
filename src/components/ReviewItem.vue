<template>
  <div>
    <li class="list-group-item">
      <div class="w-100">
        <div class="d-flex w-100 justify-content-between">
          <div>
            {{ this.user.username }}
            <i
              v-for="star of this.stars"
              :key="star"
              class="bi"
              :class="{
                'bi-star': star > review.rating,
                'bi-star-fill': star <= review.rating,
              }"
            ></i>
          </div>
          <div
            v-if="Number(this.$store.state.user_id) === Number(review.user)"
            class="dropdown"
          >
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
                  @click="$emit('edit', review)"
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
                  @click="$emit('remove', review)"
                  class="dropdown-item"
                  type="button"
                >
                  Удалить
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-100">
          <textarea
            class="form-control"
            v-model="review.review"
            readonly
          ></textarea>
          <div>Created: {{ review.created }}</div>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ReviewItem",
  props: {
    review: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: "",
      created: "",
      stars: [1, 2, 3, 4, 5],
    };
  },
  methods: {
    async getOwner() {
      try {
        await this.$store.dispatch("setAccess");
        const response = await axios.get(
          this.$store.state.url + `auth/users/${this.review.user}/`,
          {
            headers: {
              Authorization: "JWT " + this.$store.state.access,
            },
          }
        );
        this.user = response.data;
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
    this.getOwner();
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
