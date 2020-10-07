import axios from "axios";
const state = {
  posts: [],
  comments: [],
};

const mutations = {
  UPDATE_POSTS(state, payload) {
    state.posts = payload;
  },
  ADD_POST(state, payload) {
    state.posts.push(payload);
  },
  UPDATE_COMMENTS(state, payload) {
    state.comments = payload;
  },
};

const actions = {
  getPosts({ commit }) {
    axios
      .get("http://127.0.0.1:8000/api/v1/")
      .then((response) => {
        commit("UPDATE_POSTS", response.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  },
  getComments({ commit }, postId) {
    axios
      .get(`http://127.0.0.1:8000/api/v1/${postId}/comments/`)
      .then((response) => {
        commit("UPDATE_COMMENTS", response.data);
      });
  },
  deletePost({ commit, dispatch }, postId) {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://127.0.0.1:8000/api/v1/${postId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        dispatch("getPosts");
      });
  },
  postItem({ commit }, newPost) {
    const post = newPost;
    const token = localStorage.getItem("token");
    axios
      .post(`http://127.0.0.1:8000/api/v1/`, post, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        commit("ADD_POST", response.data);
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  },
  editItem({ commit, dispatch }, newPost) {
    const token = localStorage.getItem("token");
    const id = newPost.id;
    delete newPost.id;
    axios
      .put(`http://127.0.0.1:8000/api/v1/${id}/`, newPost, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        dispatch("getPosts");
      });
  },
  upvotePost({ commit }, post) {
    const token = localStorage.getItem("token");
    axios
      .get(`http://127.0.0.1:8000/api/v1/upvote/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
          postId: post.id,
        },
      })
      .then((response) => {
        post.votes++;
      });
  },
};

const getters = {
  posts: (state) => state.posts,
  postFromId: (state) => (id) => {
    return state.posts.find((post) => post.id === id);
  },
  comments: (state) => state.comments,
};

const postModule = {
  state,
  mutations,
  actions,
  getters,
};

export default postModule;
