<template>
  <div id="login" class="box has-text-centered">
    <h2 class="title">Register for the Forum</h2>
    <form @submit="submitForm" class="ui form">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input v-model="input.username" class="input" placeholder="Username" />
        </p>
        <div class="error" v-if="!$v.input.username.required && submitStatus">Username is required</div>
      </div>
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input v-model="input.email" class="input" placeholder="Email" />
        </p>
        <div class="error" v-if="!$v.input.email.required && submitStatus">Email is required</div>
        <div class="error" v-if="!$v.input.email.email && submitStatus">Incorrect Email format</div>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input v-model="input.password1" class="input" type="password" placeholder="Password" />
        </p>
        <div
          class="error"
          v-if="!$v.input.password1.required && submitStatus"
        >Password field is required</div>
        <div class="error" v-if="!$v.input.password1.minLength && submitStatus">
          Password must be minimum of 8 characters and also contain numeric
          values
        </div>
      </div>
      <div>
        <p class="control has-icons-left">
          <input
            v-model="input.password2"
            class="input"
            type="password"
            placeholder="Retype Password"
          />
        </p>
        <div class="error" v-if="!$v.input.password2.required && submitStatus">Retype the Password</div>
        <div class="error" v-if="$v.input.password2.sameAs && submitStatus">Passwords must match</div>
      </div>

      <div class="field">
        <p class="control">
          <button :class="{ 'is-loading': loading }" class="button is-success">Sign Up</button>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  required,
  minLength,
  sameAs,
  email,
  alphaNum,
} from "vuelidate/lib/validators";
export default {
  name: "Register",
  computed: {
    ...mapGetters(["loading"]),
  },
  data() {
    return {
      input: {
        username: "",
        email: "",
        password1: "",
        password2: "",
      },
      submitStatus: null,
    };
  },
  validations: {
    input: {
      username: {
        required,
      },
      email: {
        required,
        email: email,
      },
      password1: {
        required,
        minLength: minLength(8),
        alpahNum: alphaNum,
      },
      password2: {
        required,
        sameAsPassword: sameAs("password1"),
      },
    },
  },
  methods: {
    submitForm(evt) {
      evt.preventDefault();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.$store.dispatch("register", this.input).then(() => {
          this.submitStatus = "OK";
          this.$router.push({ path: "/login" });
        });
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
