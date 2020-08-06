<template>
  <div style="display:flex; width:100%">
    <figure class="media-left">
      <img class="image is-64x64" src />
    </figure>

    <div class="media-content">
      <div class="content">
        <p>
          <strong>
            <router-link :to="'/posts/' + post.id" class="has-text-info">
              {{
              post.title
              }}
            </router-link>
            <span class="tag is-small">#{{ post.id }}</span>
          </strong>
          <br />
          {{ post.body }}
          <br />
          <small class="is-size-7">
            Submitted by:
            {{ post.author }}
          </small>
        </p>
      </div>
    </div>

    <div class="media-right">
      <span @click="upvotePost(post)" class="icon is-small">
        <i class="fa fa-chevron-up"></i>
        <strong class="has-text-info">{{ post.votes }}</strong>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "PostListItem",
  props: ["post"],
  methods: {
    ...mapActions(["upvotePost", "getPostDetail"]),
  },
};
</script>

<style scoped>
.media {
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #e6e7e9;
  padding: 1em 1.5em 0.5em 1.5em;
  border-radius: 0.3em;
}

.media + .media {
  margin-top: 1.5rem;
}

.blue-border {
  border: 1px solid #3373dc !important;
}

.tag {
  font-size: 0.6rem !important;
}

.icon {
  cursor: pointer;
}

.image.is-24x24 {
  display: inline;
  position: relative;
  top: 5px;
  border-radius: 20px;
}
</style>
