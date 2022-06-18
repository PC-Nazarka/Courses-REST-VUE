<template>
    <nav-bar></nav-bar>
    <router-view/>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
export default {
  name: "App",
  components: {
    "nav-bar": NavBar,
  }
};
</script>
