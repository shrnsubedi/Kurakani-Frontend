<template>
  <div id="login" class="box has-text-centered">
    <h2 class="title">Login</h2>
    <form @submit="submitForm" class="ui form">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input
            v-model="input.username"
            class="input"
            placeholder="Username"
          />
        </p>
        <div class="error" v-if="!$v.input.username.required && submitStatus">
          Username is required
        </div>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input
            v-model="input.password"
            class="input"
            type="password"
            placeholder="Password"
          />
        </p>
        <div class="error" v-if="!$v.input.password.required && submitStatus">
          Password is required
        </div>
        <div class="error" v-if="!$v.input.password.minLength && submitStatus">
          Password must be minimum of 8 characters
        </div>
      </div>
      <div class="field">
        <p class="control">
          <button
            :class="{ 'is-loading': loading }"
            type="submit"
            class="button is-success"
          >
            Login
          </button>
        </p>
        <p v-if="submitStatus === 'ERROR'">Please fill the form correctly</p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "Login",
  computed: {
    ...mapGetters(["loading"]),
  },
  data() {
    return {
      input: {
        username: "",
        password: "",
      },
      submitStatus: null,
    };
  },
  validations: {
    input: {
      username: {
        required,
      },
      password: {
        required,
        minLength: minLength(8),
      },
    },
  },
  methods: {
    submitForm(evt) {
      evt.preventDefault();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.$store.dispatch("login", this.input).then(() => {
          this.submitStatus = "OK";
          this.$router.push({ path: "/" });
        });
      }
    },
  },
};
</script>

<style scoped></style>
