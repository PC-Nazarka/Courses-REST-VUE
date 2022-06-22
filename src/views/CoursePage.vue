<template>
  <div class="container py-2">
    <div class="row">
      <div class="col-4">
        <img :src="this.course.image" class="d-block w-100" />
      </div>
      <div class="info col-8">
        <h5>{{ this.course.name }}</h5>
        <p>Цена: {{ this.course.price }}</p>
        <p>Дата создания: {{ Date(this.course.created) }}</p>
        <div class="d-flex">
          Рейтинг:
          <div class="px-2">
            <i
              v-for="star of 5"
              :key="star"
              class="bi"
              :class="{
                'bi-star': star > this.course.rating,
                'bi-star-fill': star <= this.course.rating,
              }"
            ></i>
          </div>
          {{ this.course.rating }}
        </div>
        <!-- <div class="rating">
          <input type="radio" name="rating" value="5" id="5" /><label for="5"
            >☆</label
          >
          <input type="radio" name="rating" value="4" id="4" /><label for="4"
            >☆</label
          >
          <input type="radio" name="rating" value="3" id="3" /><label for="3"
            >☆</label
          >
          <input type="radio" name="rating" value="2" id="2" /><label for="2"
            >☆</label
          >
          <input type="radio" name="rating" value="1" id="1" /><label for="1"
            >☆</label
          >
        </div> -->
      </div>
    </div>
    <div class="py-2">
      <p>{{ this.course.description }}</p>
    </div>
    <div class="py-2">
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
      <div
        v-if="!this.course.students.includes(Number(this.$store.state.user_id))"
      >
        <button @click="this.buyCourse" class="btn btn-success me-2">
          Преобрести
        </button>
      </div>
      <div v-else>
        <button class="btn btn-success me-2">
          Написать отзыв
        </button>
        <button class="btn btn-success me-2">Продолжить обучение</button>
        <button @click="this.buyCourse" class="btn btn-success me-2">Покинуть курс</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "CoursePage",
  data() {
    return {
      course: Object(),
      topics: [],
    };
  },
  methods: {
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
        await router.push({ name: "Main" });
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
        for (let i of this.course.topics) {
          const response = await axios.get(
            this.$store.state.url + `topics/${i}/`,
            {
              headers: {
                Authorization: "JWT " + this.$store.state.access,
              },
            }
          );
          this.topics = [...this.topics, response.data];
        }
        this.topics.sort(this.compareFunction);
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
        await router.push({ name: "Main" });
      }
    },
    async getCourse() {
      try {
        const response = await axios.get(
          this.$store.state.url + `courses/${this.$route.params.id}/`,
          {
            headers: {
              Authorization: "JWT " + this.$store.state.access,
            },
          }
        );
        this.course = response.data;
        await this.getTopics();
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
    this.getCourse();
  },
};
</script>

<style>
/* .rating {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center
}

.rating>input {
    display: none
}

.rating>label {
    position: relative;
    width: 1em;
    font-size: 30px;
    font-weight: 300;
    color: #FFD600;
    cursor: pointer
}

.rating>label::before {
    content: "\2605";
    position: absolute;
    opacity: 0
}

.rating>label:hover:before,
.rating>label:hover~label:before {
    opacity: 1 !important
}

.rating>input:checked~label:before {
    opacity: 1
}

.rating:hover>input:checked~label:before {
    opacity: 0.4
}


.buttons{
	top: 36px;
    position: relative;
}


.rating-submit{
	border-radius: 15px;
	color: #fff;
	    height: 49px;
}


.rating-submit:hover{
	
	color: #fff;
} */
</style>
