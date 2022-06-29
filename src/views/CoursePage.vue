<template>
  <div class="container py-2">
    <div class="row">
      <div class="col-4">
        <img :src="this.course.image" class="d-block w-100" />
      </div>
      <div class="info col-8">
        <h5>{{ this.course.name }}</h5>
        <p>Цена: {{ this.course.price }}</p>
        <p>Дата создания: {{ this.course.created }}</p>
        <div class="d-flex">
          Рейтинг:
          <div class="px-2">
            <i
              v-for="star of this.stars"
              :key="star"
              class="bi"
              :class="{
                'bi-star': star > this.course.rating,
                'bi-star-fill': star <= this.course.rating,
              }"
            ></i>
          </div>
          {{ this.rating }}
        </div>
      </div>
    </div>
    <div class="py-2">
      <p>{{ this.course.description }}</p>
    </div>
    <div class="py-2" v-if="!this.topics.length">В курсе темы отсутствуют</div>
    <div class="py-2" v-else>
      В курсе присутствуют следующие темы:
      <ul class="list-group">
        <li
          v-for="topic in this.topics"
          :key="topic.id"
          class="list-group-item"
        >
          {{ topic.title }}
        </li>
      </ul>
    </div>
    <div class="d-flex pt-2">
      <button
        v-if="Number(this.$store.state.user_id) === Number(this.course.owner)"
        class="btn btn-success me-2"
        @click="
          $router.push({ name: 'CourseEdit', params: { id: this.course.id } })
        "
      >
        Редактировать
      </button>
      <div v-if="this.is_student">
        <button @click="this.showModalReview" class="btn btn-success me-2">
          Написать отзыв
        </button>
        <button
          @click="
            $router.push({
              name: 'CourseCompletion',
              params: { id: $route.params.id },
            })
          "
          class="btn btn-success me-2"
        >
          Продолжить обучение
        </button>
        <button @click="this.buyCourse" class="btn btn-danger me-2">
          Покинуть курс
        </button>
      </div>
      <div v-else>
        <button @click="this.buyCourse" class="btn btn-success me-2">
          Преобрести
        </button>
      </div>
    </div>
    <div>
      <div v-if="this.reviews.length">
        <h2>Отзывы</h2>
        <review-item
          v-for="review in this.reviews"
          :key="review.id"
          :review="review"
          @edit="this.editReview"
          @remove="this.removeReview"
        ></review-item>
      </div>
      <div v-else>
        <h2>Отзывы отсутствуют</h2>
      </div>
    </div>
    <modal-window
      :show="this.isShowModal"
      v-show="this.isShowModal"
      @close="this.showModalReview"
    >
      <template #header> Написание отзыва </template>
      <template #body>
        <div>
          <textarea class="w-100 form-control" v-model="this.review"></textarea>
        </div>
        <div class="d-flex">
          <i
            type="radio"
            name="ranting"
            class="bi bi-star"
            @mouseover="this.selectStar"
            v-for="star of this.stars"
            :key="star"
            :value="star"
            :id="star"
          ></i>
        </div>
      </template>
      <template #footer>
        <button class="btn btn-success" type="button" @click="this.sendReview">
          Отправить
        </button>
      </template>
    </modal-window>
    <modal-window
      :show="this.isShowModalEdit"
      v-show="this.isShowModalEdit"
      @close="this.isShowModalEdit = !this.isShowModalEdit"
    >
      <template #header> Редактирование отзыва </template>
      <template #body>
        <div>
          <textarea
            class="w-100 form-control"
            v-model="this.reviewForEdit.review"
          ></textarea>
        </div>
        <div class="d-flex">
          <i
            type="radio"
            name="ranting"
            class="bi"
            :class="{
              'bi-star': star > this.reviewForEdit.rating,
              'bi-star-fill': star <= this.reviewForEdit.rating,
            }"
            @mouseover="this.selectStar"
            v-for="star of this.stars"
            :key="star"
            :value="star"
            :id="star"
          ></i>
        </div>
      </template>
      <template #footer>
        <button
          class="btn btn-success"
          type="button"
          @click="this.sendEditReview"
        >
          Отправить
        </button>
      </template>
    </modal-window>
  </div>
</template>

<script>
import ModalWindow from "@/components/ModalWindow.vue";
import ReviewItem from "@/components/ReviewItem.vue";
import axios from "axios";
import router from "../router";

export default {
  name: "CoursePage",
  components: {
    "modal-window": ModalWindow,
    "review-item": ReviewItem,
  },
  data() {
    return {
      isShowModal: false,
      isShowModalEdit: false,
      course: Object(),
      topics: [],
      review: "",
      rating: 0,
      stars: [1, 2, 3, 4, 5],
      reviews: [],
      reviewForEdit: Object(),
      is_student: null,
    };
  },
  methods: {
    async sendEditReview() {
      try {
        await this.$store.dispatch("setAccess");
        let stars =
          document.querySelectorAll("i[name='ranting'].bi-star-fill").length /
          2;
        const response = await axios.put(
          this.$store.state.url + `reviews/${this.reviewForEdit.id}/`,
          {
            rating: stars,
            review: this.reviewForEdit.review,
            course: this.$route.params.id,
          },
          {
            headers: {
              Authorization: "JWT " + this.$store.state.access,
            },
          }
        );
        alert("Review success edited");
        location.reload();
        this.isShowModalEdit = false;
        this.reviews = [];
        await this.getReviews();
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
        await this.$router.push({ name: "Main" });
      }
    },
    async removeReview(review) {
      try {
        await this.$store.dispatch("setAccess");
        const response = await axios.delete(
          this.$store.state.url + `reviews/${review.id}/`,
          {
            headers: {
              Authorization: "JWT " + this.$store.state.access,
            },
          }
        );
        location.reload();
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
        await this.$router.push({ name: "Main" });
      }
    },
    editReview(review) {
      this.reviewForEdit = review;
      this.isShowModalEdit = true;
    },
    async sendReview() {
      try {
        await this.$store.dispatch("setAccess");
        let stars =
          document.querySelectorAll("i[name='ranting'].bi-star-fill").length /
          2;
        const response = await axios.post(
          this.$store.state.url + `reviews/`,
          {
            rating: stars,
            review: this.review,
            course: this.$route.params.id,
          },
          {
            headers: {
              Authorization: "JWT " + this.$store.state.access,
            },
          }
        );
        alert("Review success created");
        location.reload();
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
        await this.$router.push({ name: "Main" });
      }
    },
    selectStar(e) {
      let stars = document.querySelectorAll("i[name='ranting']");
      for (let star of stars) {
        if (Number(star.id) <= e.target.id) {
          star.classList.remove("bi-star");
          star.classList.add("bi-star-fill");
        } else {
          star.classList.remove("bi-star-fill");
          star.classList.add("bi-star");
        }
      }
    },
    showModalReview() {
      this.isShowModal = !this.isShowModal;
    },
    async buyCourse() {
      try {
        await this.$store.dispatch("setAccess");
        const response = await axios.post(
          this.$store.state.url + `courses/${this.course.id}/add-student/`,
          {},
          {
            headers: {
              Authorization: "JWT " + this.$store.state.access,
            },
          }
        );
        alert(response.data.message);
        location.reload();
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
        await this.$router.push({ name: "Main" });
      }
    },
    compareFunction(a, b) {
      if (a.number < b.number) {
        return -1;
      }
      if (a.number > b.number) {
        return 1;
      }
      return 0;
    },
    async getTopics() {
      try {
        let topics = [];
        for (let i of this.course.topics) {
          await this.$store.dispatch("setAccess");
          const response = await axios.get(
            this.$store.state.url + `topics/${i}/`,
            {
              headers: {
                Authorization: "JWT " + this.$store.state.access,
              },
            }
          );
          topics.push(response.data);
        }
        topics.sort(this.compareFunction);
        this.topics = topics;
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
        await this.$router.push({ name: "Main" });
      }
    },
    async getCourse() {
      try {
        await this.$store.dispatch("setAccess");
        const response = await axios.get(
          this.$store.state.url + `courses/${this.$route.params.id}/`,
          {
            headers: {
              Authorization: "JWT " + this.$store.state.access,
            },
          }
        );
        this.course = response.data;
        this.rating = Number(this.course.rating.toFixed(1));
        this.is_student =
          this.course.students.includes(Number(this.$store.state.user_id)) ||
          Number(this.$store.state.user_id) === Number(this.course.owner);
        await this.getTopics();
        await this.getReviews();
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
        await this.$router.push({ name: "Main" });
      }
    },
    async getReviews() {
      try {
        let reviews = [];
        for (let i of this.course.reviews) {
          await this.$store.dispatch("setAccess");
          const review = await axios.get(
            this.$store.state.url + `reviews/${i}/`,
            {
              headers: {
                Authorization: "JWT " + this.$store.state.access,
              },
            }
          );
          reviews.push(review.data);
        }
        this.reviews = reviews;
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
        await this.$router.push({ name: "Main" });
      }
    },
  },
  created() {
    this.getCourse();
  },
};
</script>

<style>
html,
body,
#editor {
  margin: 0;
  height: 100%;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
}

textarea,
#editor div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
</style>
