<template>
  <div>
    <div class="my-3">
      <label class="form-label">Введите тему</label>
      <input
        type="text"
        class="form-control"
        placeholder="Тема"
        v-model="this.titleTopic"
      />
    </div>
    <div class="d-flex flex-column align-items-center">
      <ul class="list-group mb-5">
        <draggable
          class="dragArea list-group w-full"
          :list="this.tasks"
          @change="this.changeIndex"
        >
          <li
            class="list-group-item d-flex justify-content-between"
            v-for="task in this.tasks"
            :key="task.id"
          >
            {{ task.title }}
            <div>
              <i @click="this.editTask" class="bi bi-pencil me-2"></i>
              <i @click="this.deleteTask" class="bi bi-trash3"></i>
            </div>
          </li>
        </draggable>
        <button @click="this.createTask" class="list-group-item">
          <i class="bi bi-plus-circle pe-1"></i>
          <span v-if="this.editing_task">Редактировать</span
          ><span v-else>Создать</span> задание
        </button>
      </ul>
      <div class="my-3">
        <label class="form-label">Введите заголовок</label>
        <input
          type="text"
          class="form-control"
          placeholder="Заголовок"
          v-model="this.title"
        />
      </div>
      <select
        v-model="this.type"
        class="form-select mb-3"
        aria-label="Default select example"
      >
        <option value="" selected disabled>Выберите тип</option>
        <option value="INFORMATION">Информационный</option>
        <option value="TEST">Тестовый</option>
      </select>
      <v-md-editor
        v-model="this.content"
        height="400px"
        class="w-100"
      ></v-md-editor>
      <div v-if="this.type === 'TEST'">
        <ul class="list-group my-5">
          <li
            class="list-group-item d-flex justify-content-between"
            v-for="answer of this.answers"
            :key="answer.id"
          >
            {{ answer.content }}
            <div>
              <i @click="this.editChoiceAnswer" class="bi bi-pencil me-2"></i>
              <i @click="this.deleteChoiceAnswer" class="bi bi-trash3"></i>
            </div>
          </li>
          <button @click="this.createAnswer" class="list-group-item">
            <i class="bi bi-plus-circle pe-1"></i>
            <span v-if="this.editing_answer">Редактировать</span>
            <span v-else>Создать</span> вариант ответа
          </button>
        </ul>
        <div>
          <div class="mb-3">
            <label class="form-label">Введите текст вопроса</label>
            <input
              v-model="this.answer"
              type="text"
              class="form-control"
              placeholder="Вопрос"
            />
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckChecked"
              v-model="this.is_true"
            />
            <label class="form-check-label" for="flexCheckChecked">
              Вариант ответа верный?
            </label>
          </div>
        </div>
      </div>
      <button @click="this.createTopic" class="btn btn-success my-5">
        <span v-if="this.editing_topic">Редактировать</span>
        <span v-else>Создать</span> тему
      </button>
    </div>
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
export default {
  name: "LessonForm",
  components: {
    draggable: VueDraggableNext,
  },
  props: {
    topic: Object,
  },
  data() {
    return {
      titleTopic: "",
      editing_topic: false,
      tasks: [],
      content: "",
      title: "",
      type: "",
      editing_task: false,
      id_editing_task: null,
      answers: [],
      is_true: false,
      answer: "",
      editing_answer: false,
      id_editing_answer: null,
    };
  },
  methods: {
    changeIndex(event) {
      let currentTask = this.tasks.filter(
        (task) => task.number === event.moved.newIndex
      )[0];
      event.moved.element.number = event.moved.newIndex;
      currentTask.number = event.moved.oldIndex;
    },
    createTopic() {
      if (!this.editing_topic) {
        if (this.titleTopic && this.tasks.length) {
          let topic = {
            id: Number((new Date().getTime() / 1000).toFixed(0)),
            title: this.titleTopic,
            tasks: this.tasks,
            is_new: true,
          };
          this.$emit("create", topic);
        }
      } else {
        this.topic.title = this.titleTopic;
        this.topic.tasks = this.tasks;
        this.topic.is_edit = true;
        this.editing_topic = false;
        this.$emit("edit");
      }
      this.titleTopic = "";
      this.tasks = [];
      this.content = "";
      this.title = "";
      this.type = "";
      this.answers = [];
      this.is_true = false;
      this.answer = "";
    },
    editTask(event) {
      let currentTask = this.tasks.filter(
        (task) => task.title === event.path[2].textContent.trim()
      )[0];
      this.title = currentTask.title;
      this.content = currentTask.text;
      this.type = currentTask.type_task;
      this.answers = currentTask.answers;
      this.editing_task = true;
      this.id_editing_task = currentTask.id;
    },
    deleteTask(event) {
      this.tasks.splice(
        this.tasks.indexOf(
          this.tasks.filter(
            (task) => task.title === event.path[2].textContent.trim()
          )[0]
        ),
        1
      );
    },
    createTask() {
      if (!this.editing_task) {
        if (this.content && this.type && this.title) {
          let task = {
            id: Number((new Date().getTime() / 1000).toFixed(0)),
            title: this.title,
            text: this.content,
            type_task: this.type,
            number: this.tasks.length,
            is_new: true,
          };
          if (this.type === "TEST") {
            task.answers = this.answers;
          }
          this.tasks.push(task);
        } else {
          alert("Задание пустое");
        }
      } else {
        let index = this.tasks.indexOf(
          this.tasks.filter((task) => task.id === this.id_editing_task)[0]
        );
        this.tasks[index].title = this.title;
        this.tasks[index].text = this.content;
        this.tasks[index].type_task = this.type;
        this.tasks[index].is_edit = true;
        if (this.type === "TEST") {
          this.tasks.answers = this.answers;
        } else {
          delete this.tasks.answers;
        }
        this.editing_task = false;
        this.id_editing_task = null;
      }
      this.title = "";
      this.content = "";
      this.type = "";
      this.answers = [];
    },
    editChoiceAnswer(event) {
      let currentAnswer = this.answers.filter(
        (answer) => answer.content === event.path[2].textContent.trim()
      )[0];
      this.answer = currentAnswer.content;
      this.is_true = currentAnswer.is_true;
      this.editing_answer = true;
      this.id_editing_answer = currentAnswer.id;
    },
    deleteChoiceAnswer(event) {
      this.answers.splice(
        this.answers.indexOf(
          this.answers.filter(
            (answer) => answer.content === event.path[2].textContent.trim()
          )[0]
        ),
        1
      );
    },
    createAnswer() {
      if (!this.editing_answer) {
        if (this.answer) {
          let answer = {
            id: Number((new Date().getTime() / 1000).toFixed(0)),
            content: this.answer.trim(),
            is_true: this.is_true,
            is_new: true,
          };
          this.answers.push(answer);
          this.answer = "";
          this.is_true = false;
        } else {
          alert("Вариант ответа пуст");
        }
      } else {
        let index = this.answers.indexOf(
          this.answers.filter(
            (answer) => answer.id === this.id_editing_answer
          )[0]
        );
        this.answers[index].content = this.answer;
        this.answers[index].is_true = this.is_true;
        this.answers[index].is_edit = true;
        this.editing_answer = false;
        this.id_editing_answer = null;
        this.answer = "";
        this.is_true = false;
      }
    },
  },
  mounted() {
    if (this.topic) {
      this.tasks = this.topic.tasks;
      this.titleTopic = this.topic.title;
      this.editing_topic = true;
    }
  },
};
</script>

<style></style>
