import axios from "axios";

const state = {
  token: null,
  loading: false,
  userId: null,
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  LOGIN_PENDING(state) {
    state.loading = true;
  },
  LOGIN_SUCCESS(state) {
    state.loading = false;
  },
  SET_USER_ID(state, ID) {
    state.userId = ID;
  },
};

const actions = {
  login({ commit }, formData) {
    const credentials = {
      username: formData.username,
      password: formData.password,
    };
    commit("LOGIN_PENDING");
    return (
      axios
        .post(
          "https://floating-atoll-08442.herokuapp.com/api/v1/rest-auth/login/",
          credentials
        )
        .then((response) => {
          localStorage.setItem("token", response.data.key);
          commit("SET_TOKEN", response.data.key);
          commit("LOGIN_SUCCESS");
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.log(error))
    );
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      localStorage.removeItem("token");
      commit("SET_TOKEN", null);
      commit("SET_USER_ID", null);
      resolve();
    });
  },
  register({ commit }, formData) {
    const credentials = {
      username: formData.username,
      email: formData.email,
      password1: formData.password1,
      password2: formData.password2,
    };
    return (
      axios
        .post(
          "https://floating-atoll-08442.herokuapp.com/api/v1/rest-auth/registration/",
          credentials
        )
        .then((response) => {
          commit("LOGIN_SUCCESS");
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.log(error))
    );
  },
  getToken({ commit }) {
    const token = localStorage.getItem("token");
    commit("SET_TOKEN", token);
  },
  getUserID({ commit }) {
    return (
      axios
        .get("https://floating-atoll-08442.herokuapp.com/api/v1/getuser", {
          params: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          commit("SET_USER_ID", response.data);
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.log(error))
    );
  },
};

const getters = {
  token: (state) => state.token,
  loading: (state) => state.loading,
  userId: (state) => state.userId,
  isAuthenticated: (state) => !!state.token,
};

const loginModule = {
  state,
  mutations,
  actions,
  getters,
};

export default loginModule;
