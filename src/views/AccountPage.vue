<template>
  <div class="container col-10 my-5">
    <div class="d-flex flex-direction-row">
      <div
        class="d-flex flex-column flex-shrink-0 p-3 bg-light"
        style="width: 280px"
      >
        <ul class="nav nav-pills flex-column mb-auto list-unstyled ps-0">
          <li class="nav-item">
            <button
              class="link-dark btn btn-toggle"
              @click="
                this.nullingPage();
                this.is_account = true;
              "
            >
              Аккаунт
            </button>
          </li>
          <div v-if="this.is_me">
            <li class="nav-item">
              <button
                class="link-dark btn btn-toggle"
                @click="
                  this.nullingPage();
                  this.is_edit_account = true;
                "
              >
                Редактирование аккаунта
              </button>
            </li>
            <li class="nav-item">
              <button
                class="link-dark btn btn-toggle"
                @click="
                  this.nullingPage();
                  this.is_change_username = true;
                "
              >
                Смена username
              </button>
            </li>
            <li class="nav-item">
              <button
                class="link-dark btn btn-toggle"
                @click="
                  this.nullingPage();
                  this.is_change_password = true;
                "
              >
                Смена пароля
              </button>
            </li>
            <li class="nav-item">
              <button
                class="link-dark btn btn-toggle"
                @click="
                  this.nullingPage();
                  this.is_delete_account = true;
                "
              >
                Удаление аккаунта
              </button>
            </li>
          </div>
          <li class="nav-item mb-1">
            <button
              class="btn btn-toggle align-items-center rounded collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#account-collapse"
              aria-expanded="false"
            >
              Курсы
            </button>
            <div class="collapse" id="account-collapse">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <button
                    class="link-dark btn btn-toggle"
                    @click="
                      this.nullingPage();
                      this.is_all_courses = true;
                      this.fetchCourses('all');
                    "
                  >
                    Все
                  </button>
                </li>
                <li>
                  <button
                    class="link-dark btn btn-toggle"
                    @click="
                      this.nullingPage();
                      this.is_favorite_courses = true;
                      this.fetchCourses('favorites');
                    "
                  >
                    Избранное
                  </button>
                </li>
                <li>
                  <button
                    class="link-dark btn btn-toggle"
                    @click="
                      this.nullingPage();
                      this.is_want_pass_courses = true;
                      this.fetchCourses('want_pass');
                    "
                  >
                    Хочу пройти
                  </button>
                </li>
                <li>
                  <button
                    class="link-dark btn btn-toggle"
                    @click="
                      this.nullingPage();
                      this.is_achive_courses = true;
                      this.fetchCourses('archive');
                    "
                  >
                    Архив
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="pt-3">
        <account-info v-if="this.is_account" :user="this.user"></account-info>
        <change-username
          v-else-if="this.is_change_username && this.is_me"
        ></change-username>
        <change-password
          v-else-if="this.is_change_password && this.is_me"
        ></change-password>
        <edit-account
          v-else-if="this.is_edit_account && this.is_me"
        ></edit-account>
        <delete-account
          v-else-if="this.is_delete_account && this.is_me"
        ></delete-account>
        <list-courses
          v-else-if="
            this.is_all_courses ||
            this.is_favorite_courses ||
            this.is_want_pass_courses ||
            this.is_achive_courses
          "
          :courses="this.courses"
        ></list-courses>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
import AccountInfoPage from "@/views/AccountInfoPage.vue";
import ChangeUsernamePage from "@/views/ChangeUsernamePage.vue";
import ChangePasswordPage from "@/views/ChangePasswordPage.vue";
import EditAccountPage from "@/views/EditAccountPage.vue";
import DeleteAccountPage from "@/views/DeleteAccountPage.vue";
import ListCourses from "@/components/ListCourses.vue";
export default {
  name: "AccountPage",
  components: {
    "account-info": AccountInfoPage,
    "change-username": ChangeUsernamePage,
    "change-password": ChangePasswordPage,
    "edit-account": EditAccountPage,
    "delete-account": DeleteAccountPage,
    "list-courses": ListCourses,
  },
  data() {
    return {
      is_account: true,
      is_all_courses: false,
      is_favorite_courses: false,
      is_want_pass_courses: false,
      is_achive_courses: false,
      is_change_username: false,
      is_change_password: false,
      is_edit_account: false,
      is_delete_account: false,
      is_me: false,
      courses: [],
      user: Object(),
    };
  },
  methods: {
    nullingPage() {
      this.is_account = false;
      this.is_all_courses = false;
      this.is_favorite_courses = false;
      this.is_want_pass_courses = false;
      this.is_achive_courses = false;
      this.is_pass_courses = false;
      this.is_change_username = false;
      this.is_change_password = false;
      this.is_edit_account = false;
      this.is_delete_account = false;
    },
    async fetchCourses(mode) {
      this.courses = [];
      let courses = [];
      switch (mode) {
        case "all":
          courses = this.user.courses_student;
          break;
        case "favorites":
          courses = this.user.favorite_courses;
          break;
        case "want_pass":
          courses = this.user.want_pass_courses;
          break;
        case "archive":
          courses = this.user.archive_courses;
          break;
      }
      try {
        await this.$store.dispatch("setAccess");
        for (let i of courses) {
          const course = await axios.get(
            this.$store.state.url + `courses/${i}/`,
            {
              headers: {
                Authorization: "JWT " + this.$store.state.access,
              },
            }
          );
          this.courses = [...this.courses, course.data];
        }
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
      }
    },
    async getUser() {
      try {
        await this.$store.dispatch("setAccess");
        const response = await axios.get(
          this.$store.state.url + `auth/users/${this.$route.params.id}/`,
          {
            headers: {
              Authorization: "JWT " + this.$store.state.access,
            },
          }
        );
        this.user = response.data;
      } catch (e) {
        let str = "";
        for (let [key, value] of Object.entries(e.response.data)) {
          str += `${key}: ${value}\n`;
        }
        alert(str);
        await router.push({ name: "Main" });
      }
    },
    checkUser() {
      this.is_me =
        Number(this.$route.params.id) === Number(this.$store.state.user.id);
      if (!this.is_me) {
        this.getUser();
      } else {
        this.user = this.$store.state.user;
      }
    },
  },
  created() {
    this.checkUser();
  },
  mounted() {
    this.checkUser();
  },
  updated() {
    this.checkUser();
  },
};
</script>
