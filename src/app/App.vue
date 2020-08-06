<template>
  <div id="app">
    <NavBar />
    <div class="section">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import PostList from "./components/post/PostList";
import NavBar from "./components/navbar/NavBar";
export default {
  name: "App",
  components: {
    PostList,
    NavBar,
  },
  methods: {
    updateInitialState(token) {
      this.$store.dispatch("getToken", token);
      this.$store.dispatch("getPosts");
    },
  },
  created() {
    const token = localStorage.getItem("token");
    this.updateInitialState(token);
  },
  watch: {
    token() {
      if (this.token) {
        this.updateInitialState(this.token);
      }
    },
  },
};
</script>

<style scoped>
.dividing-header {
  margin-top: 1em;
  margin-bottom: 2em;
}
</style>
