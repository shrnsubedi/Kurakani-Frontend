<template>
  <div class="section">
    <article v-for="post in posts" :key="post.id" class="media">
      <PostListItem :post="post" />
    </article>
  </div>
</template>

<script>
import PostListItem from "./PostListItem";
import { mapGetters } from "vuex";
export default {
  name: "PostList",
  computed: {
    ...mapGetters(["posts"]),
  },
  components: {
    PostListItem,
  },
};
</script>

<style scoped>
.section {
  padding: 2rem 1.5rem;
}
</style>
