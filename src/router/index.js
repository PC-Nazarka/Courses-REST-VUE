import { createRouter, createWebHistory } from 'vue-router'
import MainPage from "@/views/MainPage.vue"
import LoginPage from "@/views/LoginPage.vue"
import RegistrationPage from "@/views/RegistrationPage.vue"
import AccountInfoPage from "@/views/AccountInfoPage.vue"
import CoursePassagePage from "@/views/CoursePassagePage.vue"
import ResetPasswordPage from "@/views/ResetPasswordPage.vue"
import CreatedCoursesPage from "@/views/CreatedCoursesPage.vue"
import CoursePage from "@/views/CoursePage.vue"

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
    path: "/user/:id/",
    name: "AccountInfo",
    component: AccountInfoPage,
  },
  {
    path: "/user/:id/courses-pass/",
    name: "CoursePassage",
    component: CoursePassagePage,
  },
  {
    path: "/reset-password/",
    name: "ResetPassword",
    component: ResetPasswordPage,
  },
  {
    path: "/user/:id/created-courses/",
    name: "CreatedCourses",
    component: CreatedCoursesPage,
  },
  {
    path: "/course/:id/",
    name: "Course",
    component: CoursePage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
