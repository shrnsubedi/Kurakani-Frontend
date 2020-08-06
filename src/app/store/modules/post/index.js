import axios from "axios";
const state = {
  posts: [],
};

const mutations = {
  UPDATE_POSTS(state, payload) {
    state.posts = payload;
  },
  ADD_POST(state, payload) {
    state.posts.push(payload);
  },
};

const actions = {
  getPosts({ commit }) {
    axios
      .get("https://floating-atoll-08442.herokuapp.com/api/v1/")
      .then((response) => {
        commit("UPDATE_POSTS", response.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  },
  deletePost({ commit, dispatch }, postId) {
    const token = localStorage.getItem("token");
    axios
      .delete(`https://floating-atoll-08442.herokuapp.com/api/v1/${postId}/`, {
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
      .post(`https://floating-atoll-08442.herokuapp.com/api/v1/`, post, {
        headers: {
          Authorization: `Token ${token}`,
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
      .put(
        `https://floating-atoll-08442.herokuapp.com/api/v1/${id}/`,
        newPost,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch("getPosts");
      });
  },
  upvotePost({ commit }, post) {
    post.votes++;
    const token = localStorage.getItem("token");
    axios
      .put(
        `https://floating-atoll-08442.herokuapp.com/api/v1/${post.id}/`,
        post,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        //console.log(response);
      });
  },
};

const getters = {
  posts: (state) => state.posts,
  postFromId: (state) => (id) => {
    return state.posts.find((post) => post.id === id);
  },
};

const postModule = {
  state,
  mutations,
  actions,
  getters,
};

export default postModule;
