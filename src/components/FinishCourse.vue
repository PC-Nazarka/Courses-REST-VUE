<template>
  <div>
    <button class="btn btn-success" @click="this.createCourse">
      <span v-if="$route.params.id">Редактировать</span
      ><span v-else>Создать</span> курс
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FinishCourse",
  props: {
    course: Object,
    topics: Array,
  },
  methods: {
    async createAnswer(id, task) {
      try {
        for (let answer of task.answers) {
          let response = {};
          if (answer.is_new) {
            response = await axios.post(
              this.$store.state.url + `answers/`,
              {
                is_true: answer.is_true,
                content: answer.content,
                task: id,
              },
              {
                headers: {
                  Authorization: "JWT " + this.$store.state.access,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          } else {
            response = await axios.patch(
              this.$store.state.url + `answers/${answer.id}/`,
              {
                is_true: answer.is_true,
                content: answer.content,
                task: id,
              },
              {
                headers: {
                  Authorization: "JWT " + this.$store.state.access,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          }
        }
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
      }
    },
    async createTask(id, topic) {
      try {
        for (let task of topic.tasks) {
          let response = {};
          if (task.is_new) {
            response = await axios.post(
              this.$store.state.url + `tasks/`,
              {
                type_task: task.type_task,
                title: task.title,
                text: task.text,
                topic: id,
                number: task.number,
              },
              {
                headers: {
                  Authorization: "JWT " + this.$store.state.access,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          } else {
            response = await axios.patch(
              this.$store.state.url + `tasks/${task.id}/`,
              {
                type_task: task.type_task,
                title: task.title,
                text: task.text,
                topic: id,
                number: topic.number,
              },
              {
                headers: {
                  Authorization: "JWT " + this.$store.state.access,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          }
          if (task.answers && task.answers.length)
            await this.createAnswer(response.data.id, task);
        }
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
      }
    },
    async createTopic(id) {
      try {
        await this.$store.dispatch("setAccess");
        for (let topic of this.topics) {
          let response = {};
          if (topic.is_new) {
            response = await axios.post(
              this.$store.state.url + `topics/`,
              {
                title: topic.title,
                number: topic.number,
                course: id,
              },
              {
                headers: {
                  Authorization: "JWT " + this.$store.state.access,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          } else {
            response = await axios.patch(
              this.$store.state.url + `topics/${topic.id}/`,
              {
                title: topic.title,
                number: topic.number,
                course: id,
              },
              {
                headers: {
                  Authorization: "JWT " + this.$store.state.access,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          }
          if (topic.tasks.length)
            await this.createTask(response.data.id, topic);
        }
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
      }
    },
    async createCourse() {
      try {
        await this.$store.dispatch("setAccess");
        let response = {};
        if (this.course.is_new) {
          response = await axios.post(
            this.$store.state.url + `courses/`,
            {
              image: this.course.image,
              name: this.course.name,
              description: this.course.description,
              price: this.course.price,
              category: this.course.category,
              status: this.course.status,
            },
            {
              headers: {
                Authorization: "JWT " + this.$store.state.access,
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          response = await axios.patch(
            this.$store.state.url + `courses/${this.course.id}/`,
            {
              image: this.course.image,
              name: this.course.name,
              description: this.course.description,
              price: this.course.price,
              category: this.course.category,
              status: this.course.status,
            },
            {
              headers: {
                Authorization: "JWT " + this.$store.state.access,
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
        if (this.topics.length) await this.createTopic(response.data.id);
        alert("Курс успешно создан");
        await this.$router.push({
          name: "Course",
          params: { id: response.data.id },
        });
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
      }
    },
  },
};
</script>
