<template>
  <nav class="navbar is-dark">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">KuraKani</router-link>
      <div class="navbar-burger burger" data-target>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navbarExampleTransparentExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/posts" class="navbar-item">Posts</router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div v-if="!token" class="field is-grouped">
            <p class="control">
              <router-link to="/login" class="bd-tw-button button">
                <span>Login</span>
              </router-link>
            </p>
            <p class="control">
              <router-link to="/register" class="button is-primary">
                <span>Signup</span>
              </router-link>
            </p>
          </div>
          <div v-if="token" class="field is-grouped">
            <p class="control">
              <button @click="logout" class="button is-primary">Logout</button>
            </p>
            <p class="control">
              <router-link to="/new" class="button is-primary">
                <span>Add Post</span>
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["token"]),
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    },
  },
};
</script>

<style scoped></style>
