<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-xxl">
      <button class="btn navbar-brand" @click="$router.push({ name: 'Main' })">
        Courses
      </button>

      <div
        class="collapse navbar-collapse d-flex justify-content-end"
        id="navbarSupportedContent"
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
              <li v-if="this.$store.state.access === ''">
                <button
                  class="dropdown-item"
                  @click="$router.push({ name: 'Login' })"
                >
                  Вход
                </button>
              </li>
              <li v-if="this.$store.state.access === ''">
                <button
                  class="dropdown-item"
                  @click="$router.push({ name: 'Registration' })"
                >
                  Регистрация
                </button>
              </li>
              <li v-if="this.$store.state.access !== ''">
                <button
                  class="dropdown-item"
                  @click="
                    $router.push({
                      name: 'AccountInfo',
                      params: { id: this.$store.state.user.id },
                    })
                  "
                >
                  {{ this.$store.state.user.username }}
                </button>
              </li>
              <li v-if="this.$store.state.access !== ''">
                <button
                  class="dropdown-item"
                  @click="
                    $router.push({
                      name: 'CoursePassage',
                      params: { id: this.$store.state.user.id },
                    })
                  "
                >
                  Мое обучение
                </button>
              </li>
              <li v-if="this.$store.state.access !== ''">
                <button
                  class="dropdown-item"
                  @click="
                    $router.push({
                      name: 'CreatedCourses',
                      params: { id: this.$store.state.user.id },
                    })
                  "
                >
                  Преподавание
                </button>
              </li>
              <li v-if="this.$store.state.access !== ''">
                <button class="dropdown-item" @click="this.exit">Выход</button>
              </li>
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
};
</script>

<style></style>
