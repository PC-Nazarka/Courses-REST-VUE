<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-xxl">
      <button class="btn navbar-brand" @click="$router.push({ name: 'Main' })">
        Courses
      </button>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarSupportedContent"
        :class="{ 'd-flex justify-content-end': this.width >= 992 }"
      >
        <ul class="navbar-nav mb-2 mx-3 mb-lg-0">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Аккаунт
            </a>
            <ul class="dropdown-menu me-5" aria-labelledby="navbarDropdown">
              <div v-if="this.$store.state.access === ''">
                <li>
                  <a
                    class="dropdown-item"
                    @click="$router.push({ name: 'Login' })"
                  >
                    Вход
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    @click="$router.push({ name: 'Registration' })"
                  >
                    Регистрация
                  </a>
                </li>
              </div>
              <div v-else>
                <li>
                  <a
                    class="dropdown-item"
                    @click="
                      $router.push({
                        name: 'Account',
                        params: { id: this.$store.state.user.id },
                      })
                    "
                  >
                    {{ this.$store.state.user.username }}
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    @click="
                      $router.push({
                        name: 'CoursePassage',
                        params: { id: this.$store.state.user.id },
                      })
                    "
                  >
                    Мое обучение
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    @click="
                      $router.push({
                        name: 'CreatedCourses',
                        params: { id: this.$store.state.user.id },
                      })
                    "
                  >
                    Преподавание
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" @click="this.exit">Выход</a>
                </li>
              </div>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "NavBar",
  data() {
    return {
      user: {},
      width: 0,
    };
  },
  methods: {
    async exit() {
      try {
        await this.$store.dispatch("setAccess");
        const response = await axios.post(
          this.$store.state.url + "logout/",
          {
            refresh: this.$store.state.refresh,
          },
          {
            headers: {
              Authorization: "JWT " + this.$store.state.access,
            },
          }
        );
        if (response.status === 204) {
          this.$store.commit("setAccess", "");
          this.$store.commit("setRefresh", "");
          this.$store.commit("setUser", Object());
          localStorage.clear();
          await router.push({ name: "Main" });
        }
      } catch (e) {
        alert("Ошибка выхода");
      }
    },
  },
  watch: {
    $route() {
      this.$store.dispatch("setAccess");
      this.$store.dispatch("setUser");
    },
  },
  created() {
    this.$store.dispatch("setAccess");
    this.$store.dispatch("setUser");
  },
  beforeMount() {
    this.$store.dispatch("setAccess");
    this.$store.dispatch("setUser");
  },
  mounted() {
    this.width = window.innerWidth;
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
    });
  },
  updated() {
    this.width = window.innerWidth;
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
    });
  },
};
</script>

<style></style>
