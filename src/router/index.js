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

function isClear(storeState) {
  const clearUser = storeState.user_id === -1;
  const clearAccess = storeState.access === "";
  const clearRefresh = storeState.refresh === "";
  return clearUser && clearAccess && clearRefresh;
}

router.beforeEach(async (to, from, next) => {
  console.log(to.name);
  console.log(localStorage);
  console.log(store.state);
  console.log("Before reg");
  if (["Login", "Registration"].includes(to.name) && !isClear(store.state)) {
    conspole.log("In reg");
    next({ name: "Main" });
  }
  console.log("After reg");
  if (
    ["Registration", "Login"].includes(to.name) ||
    (to.name === "Main" && isClear(store.state))
  ) {
    console.log("In anonim");
    next();
  }
  try {
    await axios.post(store.state.url + "auth/jwt/verify/", {
      token: store.state.access,
    });
    console.log("Verify");
  } catch (e) {
    console.log("hi");
    store.dispatch("setAccess");
  }
  next();
});

export default router;
