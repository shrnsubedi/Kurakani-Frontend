<template>
  <div>
    <section id="product-item" class="box" v-if="postItem">
      <span class="return-icon" @click="$router.go(-1)">
        <i class="fa fa-arrow-left is-primary"></i>
      </span>
      <figure class="media-right">
        <p class="image is-128x128">
          <img :src="postItem.image" />
        </p>
      </figure>
      <div class="product-item__details">
        <h1 class="title is-4">
          <p>{{ postItem.title }}</p>
          <span class="tag product-item__tag">#{{ postItem.id }}</span>
        </h1>
        <p class="product-item__description">{{ postItem.body }}</p>
        <hr />
        <p class="product-item__created_at">
          By:
          <span class="has-text-weight-bold">{{ postItem.author }}</span>
        </p>
        <div class="delete-button">
          <button style="margin-right:10px;" @click="deleteItem" class="button is-danger">Delete</button>
          <router-link :to="'/posts/' + postItem.id+'/edit'" class="button is-primary">Edit</router-link>
        </div>
      </div>
      <hr />
    </section>
    <div class="comment-section box">
      <CommentSection :comments="comments" />
    </div>
  </div>
</template>

<script>
import CommentSection from "./CommentSection.vue";
export default {
  name: "PostItem",
  props: ["id"],
  components: {
    CommentSection,
  },
  computed: {
    postItem() {
      return this.$store.getters.postFromId(Number(this.id));
    },
    comments() {
      return this.$store.getters.comments;
    },
  },
  created() {
    this.$store.dispatch("getComments", this.id).then(() => {
      console.log("Comments recieved");
    });
  },
  methods: {
    deleteItem() {
      this.$store.dispatch("deletePost", this.id).then(() => {
        this.$router.push({ path: "/posts" });
      });
    },
  },
};
</script>

<style scoped>
#product-item {
  display: flex;
  width: 100%;
  position: relative;
}
.return-icon {
  position: absolute;
  top: 5px;
  left: 10px;
  color: #00d1b2;
  cursor: pointer;
}

.product-item__details {
  max-width: 50%;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.product-item__description {
  padding-bottom: 10px;
}
.product-item__created_at {
  font-size: 12px;
  padding-bottom: 10px;
}
.product-item__button {
  max-width: 150px;
}
</style>
