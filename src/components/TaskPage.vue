<template>
  <div class="w-100">
    <v-md-editor v-model="task.text" mode="preview"></v-md-editor>
    <div v-if="task.type_task === 'TEST'">
      <div v-for="answer in task.answers" :key="answer.id" class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          :id="answer.id"
          @click="this.addSelectedAnswers"
        />
        <label
          class="form-check-label"
          :for="answer.id"
          @click="this.addSelectedAnswers"
        >
          {{ answer.content }}
        </label>
      </div>
      <button @click="this.sendAnswer" class="mt-2 btn btn-success">
        Отправить ответ
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskPage",
  data() {
    return {
      selectedAnswers: [],
      valueAnswer: null,
    };
  },
  props: {
    task: {
      type: Object,
      default: Object(),
    },
  },
  methods: {
    sendAnswer() {
      let answers = this.task.answers.filter((answer) =>
        this.selectedAnswers.includes(answer.id)
      );
      this.valueAnswer = answers.every((answer) => answer.is_true);
      this.$emit("answer", this.task.id, this.valueAnswer);
    },
    addSelectedAnswers(event) {
      if (event.pointerId !== -1) {
        const id =
          event.target.localName === "label"
            ? Number(event.target.htmlFor)
            : Number(event.target.id);
        if (!this.selectedAnswers.includes(id)) {
          this.selectedAnswers.push(id);
        } else {
          this.selectedAnswers.splice(this.selectedAnswers.indexOf(id), 1);
        }
      }
    },
    markedTask() {
      if (this.task.type_task === "TEST") {
        this.valueAnswer = this.task.is_complete;
      } else if (this.task.type_task === "INFORMATION") {
        this.$emit("answer", this.task.id, true);
      }
    },
  },
  mounted() {
    this.markedTask();
  },
  updated() {
    this.markedTask();
  },
};
</script>

<style></style>
