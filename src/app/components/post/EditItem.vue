<template>
  <div id="login" class="box has-text-centered">
    <h2 class="title">Edit</h2>
    <form @submit.prevent="submitItem" class="ui form">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input v-model="title" class="input" placeholder="Title" />
        </p>
        <div class="error" v-if="!$v.title.required && submitStatus === 'ERROR'">Title is required</div>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <textarea v-model="body" class="input" placeholder="Write Your Content Here" />
        </p>
        <div class="error" v-if="!$v.body.required && submitStatus">Body is required</div>
      </div>
      <div class="field">
        <p class="control">
          <button
            class="button is-success"
            type="submit"
            :disabled="submitStatus === 'Pending'"
          >Submit</button>
        </p>
      </div>
      <p v-if="submitStatus === 'ERROR'">Please fill the form correctly</p>
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "EditItem",
  data() {
    return {
      title: null,
      body: null,
      userId: null,
      submitStatus: null,
    };
  },
  props: ["id"],
  computed: {
    postItem() {
      return this.$store.getters.postFromId(Number(this.id));
    },
  },
  created() {
    this.title = this.postItem.title;
    this.body = this.postItem.body;
    this.userId = this.postItem.author;
  },
  validations: {
    title: {
      required,
    },
    body: {
      required,
    },
  },
  methods: {
    submitItem(evt) {
      evt.preventDefault();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "Pending";
        const newPost = {
          id: this.id,
          author: this.userId,
          title: this.title,
          body: this.body,
          votes: this.postItem.votes,
        };
        this.$store.dispatch("editItem", newPost).then(() => {
          this.submitStatus = "OK";
          this.$router.go(-1);
        });
      }
    },
  },
};
</script>

<style scoped></style>
