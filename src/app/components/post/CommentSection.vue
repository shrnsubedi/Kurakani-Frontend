<template>
  <div>
    <h1>Comments</h1>
    <div v-for="comment in comments" :key="comment.id">
      <article class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{comment.author}}</strong>
              <br />
              {{comment.comment}}
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <small>
                <a>Like</a> ·
                <a>Reply</a>
                · {{comment.date}}
              </small>
            </div>
          </nav>
        </div>
        <div class="media-right">
          <button class="delete"></button>
        </div>
      </article>
      <div class="field">
        <textarea class="textarea" placeholder="Enter a comment"></textarea>
      </div>
      <button class="button is-success" type="submit" :disabled="submitStatus === 'Pending'">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentSection",
  props: ["comments"],
  data() {
    return {
      commentNew: null,
      submitStatus: null,
    };
  },
};
</script>

<style scoped>
</style>