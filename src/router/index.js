import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/views/MainPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegistrationPage from "@/views/RegistrationPage.vue";
import ResetPasswordPage from "@/views/ResetPasswordPage.vue";
import CoursePage from "@/views/CoursePage.vue";
import ActivateAccountPage from "@/views/ActivateAccountPage.vue";
import ResetUsernamePage from "@/views/ResetUsernamePage.vue";
import ResetPasswordConfirmPage from "@/views/ResetPasswordConfirmPage.vue";
import ResetUsernameConfirmPage from "@/views/ResetUsernameConfirmPage.vue";
import AccountPage from "@/views/AccountPage.vue";
import CourseCreatePage from "@/views/CourseCreatePage.vue";
import CourseCompletionPage from "@/views/CourseCompletionPage.vue";
import store from "../store";
import axios from "axios";

const routes = [
  {
    path: "/",
    name: "Main",
    component: MainPage,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/registration",
    name: "Registration",
    component: RegistrationPage,
  },
  {
    path: "/user/:id",
    name: "Account",
    component: AccountPage,
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPasswordPage,
  },
  {
    path: "/reset-username",
    name: "ResetUsername",
    component: ResetUsernamePage,
  },
  {
    path: "/course/:id",
    name: "Course",
    component: CoursePage,
  },
  {
    path: "/course/:id/completion",
    name: "CourseCompletion",
    component: CourseCompletionPage,
  },
  {
    path: "/course-edit/:id",
    name: "CourseEdit",
    component: CourseCreatePage,
  },
  {
    path: "/course-create",
    name: "CourseCreate",
    component: CourseCreatePage,
  },
  {
    path: "/activate/:uid/:token",
    name: "ActivateAccount",
    component: ActivateAccountPage,
  },
  {
    path: "/reset/password/confirm/:uid/:token",
    name: "ResetPasswordConfirm",
    component: ResetPasswordConfirmPage,
  },
  {
    path: "/reset/username/confirm/:uid/:token",
    name: "ResetUsernameConfirm",
    component: ResetUsernameConfirmPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const publicPages = ["Main", "Login", "Registration"];
  const authRequired = !publicPages.includes(to.name);
  const loggedIn = Number(localStorage.user_id) !== -1;
  console.log(authRequired);
  console.log(loggedIn);
  if (authRequired && !loggedIn) {
    console.log("to login");
    next({ name: "Login" });
  }
  next();
});

export default router;
