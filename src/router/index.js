import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/views/MainPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegistrationPage from "@/views/RegistrationPage.vue";
import AccountInfoPage from "@/views/AccountInfoPage.vue";
import CoursePassagePage from "@/views/CoursePassagePage.vue";
import ResetPasswordPage from "@/views/ResetPasswordPage.vue";
import CreatedCoursesPage from "@/views/CreatedCoursesPage.vue";
import CoursePage from "@/views/CoursePage.vue";
import ActivateAccountPage from "@/views/ActivateAccountPage.vue";
import ResetUsernamePage from "@/views/ResetUsernamePage.vue";
import ResetPasswordConfirmPage from "@/views/ResetPasswordConfirmPage.vue";
import ResetUsernameConfirmPage from "@/views/ResetUsernameConfirmPage.vue";
import ChangeUsernamePage from "@/views/ChangeUsernamePage.vue";
import ChangePasswordPage from "@/views/ChangePasswordPage.vue";
import EditAccountPage from "@/views/EditAccountPage.vue";
import AccountPage from "@/views/AccountPage.vue";
import DeleteAccountPage from "@/views/DeleteAccountPage.vue";

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
    children: [
      {
        path: "",
        name: "AccountInfo",
        component: AccountInfoPage,
      },
      {
        path: "courses-pass",
        name: "CoursePassage",
        component: CoursePassagePage,
      },
      {
        path: "created-courses",
        name: "CreatedCourses",
        component: CreatedCoursesPage,
      },
      {
        path: "change-username",
        name: "ChangeUsername",
        component: ChangeUsernamePage,
      },
      {
        path: "change-password",
        name: "ChangePassword",
        component: ChangePasswordPage,
      },
      {
        path: "edit-account",
        name: "EditAccount",
        component: EditAccountPage,
      },
      {
        path: "delete-account",
        name: "DeleteAccount",
        component: DeleteAccountPage,
      },
    ],
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

export default router;
