<template>
  <div class="d-flex flex-row">
    <div class="p-3 bg-white" style="width: 280px">
      <ul class="list-unstyled ps-0">
        <li class="mb-1" v-for="topic of this.topics" :key="topic.id">
          <button
            class="btn btn-toggle d-inline-flex align-items-start rounded border-0 collapsed text-start"
            data-bs-toggle="collapse"
            :data-bs-target="this.getId(topic, true)"
            aria-expanded="false"
          >
            {{ topic.title }}
          </button>
          <div class="collapse" :id="this.getId(topic, false)">
            <ul class="btn-toggle-nav list-unstyled fw-normal my-1 small">
              <li
                v-for="task in topic.tasks"
                :key="task.id"
                @click="this.selectTask = task"
              >
                <a
                  href="#"
                  class="link-dark d-inline-flex text-decoration-none rounded w-100"
                  :class="{
                    'bg-success': task.is_complete === true,
                    'bg-danger': task.is_complete === false,
                  }"
                  ><i
                    class="bi pe-2"
                    :class="{
                      'bi-info-circle': task.type_task === 'INFORMATION',
                      'bi-pencil-fill': task.type_task === 'TEST',
                    }"
                  ></i>
                  {{ task.title }}</a
                >
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <task-page
      @answer="this.changeStatus"
      v-if="this.selectTask"
      :task="this.selectTask"
    ></task-page>
  </div>
</template>

<script>
import TaskPage from "@/components/TaskPage.vue";
import axios from "axios";
export default {
  name: "CourseCompletionPage",
  components: {
    "task-page": TaskPage,
  },
  data() {
    return {
      course: Object(),
      topics: [],
      selectTask: Object(),
    };
  },
  methods: {
    async getComplete(task) {
      try {
        await this.$store.dispatch("setAccess");
        const response = await axios.get(
          this.$store.state.url + `answers-by-user/${task.id}`,
          {
            headers: {
              Authorization: "JWT " + this.$store.state.access,
            },
          }
        );
        task.is_complete = response.data.answer;
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
      }
    },
    async changeStatus(task, valueAnswer) {
      try {
        await this.$store.dispatch("setAccess");
        await axios.patch(
          this.$store.state.url + `answers-by-user/${task}/`,
          {
            answer: valueAnswer,
          },
          {
            headers: {
              Authorization: "JWT " + this.$store.state.access,
            },
          }
        );
        this.selectTask.is_complete = valueAnswer;
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
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
    async getAnswers(task) {
      try {
        for (let i in task.answers) {
          await this.$store.dispatch("setAccess");
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
        await this.$router.push({ name: "Main" });
      }
    },
    async getTasks() {
      try {
        for (let i in this.topics) {
          let tasks = [];
          for (let j in this.topics[i].tasks) {
            await this.$store.dispatch("setAccess");
            const response = await axios.get(
              this.$store.state.url + `tasks/${this.topics[i].tasks[j]}/`,
              {
                headers: {
                  Authorization: "JWT " + this.$store.state.access,
                },
              }
            );
            tasks.push(response.data);
            await this.getComplete(tasks[tasks.length - 1]);
            if (tasks[j].answers && tasks[j].answers.length) {
              this.getAnswers(tasks[j]);
            }
          }
          tasks.sort(this.compareFunction);
          this.topics[i].tasks = tasks;
        }
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
        await this.$router.push({ name: "Main" });
      }
    },
    async getTopics() {
      try {
        let topics = [];
        for (let i in this.course.topics) {
          await this.$store.dispatch("setAccess");
          const response = await axios.get(
            this.$store.state.url + `topics/${this.course.topics[i]}/`,
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
        await this.getTasks();
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
        this.getTopics();
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
      }
    },
    getId(topic, sharp) {
      return sharp ? `#topic${topic.id}` : `topic${topic.id}`;
    },
  },
  created() {
    this.getCourse();
  },
};
</script>

<style></style>
