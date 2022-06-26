<template>
  <div>
    <button
      @click="
        this.nullingPage();
        this.is_form = true;
      "
      class="btn btn-success me-2"
    >
      Добавить тему
    </button>
    <button
      v-if="this.is_form"
      @click="
        this.nullingPage();
        this.is_list = true;
        this.topic = null;
      "
      class="btn btn-secondary"
    >
      Назад
    </button>
    <list-topics
      :topics="this.topics"
      v-if="this.is_list"
      @edit="this.editTopic"
      @remove="this.removeTopic"
    ></list-topics>
    <lesson-form
      @create="this.createTopic"
      @edit="
        this.nullingPage();
        this.is_list = true;
      "
      :topic="this.topic"
      v-if="this.is_form"
    ></lesson-form>
  </div>
</template>

<script>
import ListTopics from "@/components/ListTopics.vue";
import LessonForm from "@/components/TopicForm.vue";

export default {
  name: "LessonCreate",
  components: {
    "list-topics": ListTopics,
    "lesson-form": LessonForm,
  },
  props: {
    topics: Array,
  },
  data() {
    return {
      is_list: true,
      is_form: false,
      topic: null,
    };
  },
  methods: {
    nullingPage() {
      this.is_list = false;
      this.is_form = false;
    },
    editTopic(topic) {
      this.topic = topic;
      this.nullingPage();
      this.is_form = true;
    },
    createTopic(topic) {
      topic.number = this.topics.length;
      this.topics.push(topic);
      this.nullingPage();
      this.is_list = true;
    },
    removeTopic(topicArg) {
      this.topics.splice(
        this.topics.indexOf(
          this.topics.filter((topic) => topic.id === topicArg.id)[0]
        ),
        1
      );
    },
  },
};
</script>

<style></style>
