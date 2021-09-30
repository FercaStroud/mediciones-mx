import Vue from 'vue';

const SET_QUESTIONS_ANSWERS = (state, payload) => {
  state.questions_answers = payload.data;
};

const SET_LOADING = (state, payload) => {
  state.isLoading = payload;
};
const SET_QUERY = (state, payload) => {
  state.query = payload;
};

export default {
  SET_QUERY,
  SET_QUESTIONS_ANSWERS,
  SET_LOADING,
};
