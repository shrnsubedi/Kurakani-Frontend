<template>
  <section id="product-item" class="box" v-if="postItem">
    <span class="return-icon" @click="$router.go(-1)">
      <i class="fa fa-arrow-left is-primary"></i>
    </span>
    <div class="product-item__details">
      <h1 class="title is-4">
        <p>{{ postItem.title }}</p>
        <span class="tag product-item__tag">{{ postItem.id }}</span>
      </h1>
      <p class="product-item__description">{{ postItem.body }}</p>
      <p class="product-item__created_at">
        By:
        <span class="has-text-weight-bold">{{ postItem.author }}</span>
      </p>
    </div>
    <div class="level-item">
      <img src="https://picsum.photos/200" />
    </div>
    <div class="level-item">
      <button @click="deleteItem" class="button is-danger">Delete</button>
    </div>
    <div class="level-item">
      <router-link :to="'/posts/' + postItem.id+'/edit'" class="button is-primary">Edit</router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "PostItem",
  props: ["id"],
  computed: {
    postItem() {
      return this.$store.getters.postFromId(Number(this.id));
    },
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
