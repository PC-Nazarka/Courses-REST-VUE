<template>
  <div class="container pt-3">
    <h1 class="ps-2">Создание курса</h1>
    <div class="">
      <div class="d-flex pb-3" style="width: 280px">
        <ul class="nav nav-pills flex-row mb-auto list-unstyled ps-0">
          <li class="nav-item">
            <button
              class="link-dark btn btn-toggle"
              @click="
                this.nullingPage();
                this.is_course_create = true;
              "
            >
              Курс
            </button>
          </li>
          <li class="nav-item">
            <button
              class="link-dark btn btn-toggle"
              @click="
                this.nullingPage();
                this.is_lesson_create = true;
              "
            >
              Уроки
            </button>
          </li>
          <li class="nav-item">
            <button
              class="link-dark btn btn-toggle"
              @click="
                this.nullingPage();
                this.is_finish_create = true;
              "
            >
              Итог
            </button>
          </li>
        </ul>
      </div>
      <div>
        <course-create
          class="ps-2"
          :course="this.course"
          v-if="this.is_course_create"
        ></course-create>
        <lesson-create
          class="ps-2"
          :topics="this.topics"
          v-if="this.is_lesson_create"
        ></lesson-create>
        <finish-course
          class="ps-2"
          :course="this.course"
          :topics="this.topics"
          v-if="this.is_finish_create"
        ></finish-course>
      </div>
    </div>
  </div>
</template>

<script>
import CourseCreate from "@/components/CourseCreate.vue";
import LessonCreate from "@/components/TopicCreate.vue";
import FinishCourse from "@/components/FinishCourse.vue";
import axios from "axios";

export default {
  name: "CourseCreatePage",
  components: {
    "course-create": CourseCreate,
    "lesson-create": LessonCreate,
    "finish-course": FinishCourse,
  },
  data() {
    return {
      is_course_create: true,
      is_lesson_create: false,
      is_finish_create: false,
      course: Object(),
      topics: [],
    };
  },
  methods: {
    nullingPage() {
      this.is_course_create = false;
      this.is_lesson_create = false;
      this.is_finish_create = false;
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
    async getAnswers(task) {
      try {
        await this.$store.dispatch("setAccess");
        for (let i in task.answers) {
          const response = await axios.get(
            this.$store.state.url + `answers/${task.answers[i]}/`,
            {
              headers: {
                Authorization: "JWT " + this.$store.state.access,
              },
            }
          );
          task.answers[i] = response.data;
        }
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
        await router.push({ name: "Main" });
      }
    },
    async getTasks() {
      try {
        await this.$store.dispatch("setAccess");
        for (let i in this.topics) {
          for (let j in this.topics[i].tasks) {
            const response = await axios.get(
              this.$store.state.url + `tasks/${this.topics[i].tasks[j]}/`,
              {
                headers: {
                  Authorization: "JWT " + this.$store.state.access,
                },
              }
            );
            this.topics[i].tasks[j] = response.data;
            if (
              this.topics[i].tasks[j].answers &&
              this.topics[i].tasks[j].answers.length
            ) {
              this.getAnswers(this.topics[i].tasks[j]);
            }
          }
          this.topics[i].tasks.sort(this.compareFunction);
        }
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
        await router.push({ name: "Main" });
      }
    },
    async getTopics() {
      try {
        await this.$store.dispatch("setAccess");
        for (let i in this.course.topics) {
          const response = await axios.get(
            this.$store.state.url + `topics/${this.course.topics[i]}/`,
            {
              headers: {
                Authorization: "JWT " + this.$store.state.access,
              },
            }
          );
          this.topics.push(response.data);
        }
        this.topics.sort(this.compareFunction);
        this.getTasks();
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
        this.getTopics();
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
    if (this.$route.params.id) {
      this.getCourse();
    } else {
      this.course.is_new = true;
    }
  },
};
</script>

<style></style>
