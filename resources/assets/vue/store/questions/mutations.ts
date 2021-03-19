import Vue from 'vue';

const SET_QUESTIONS = (state, payload) => {
  state.questions = payload.data;
};

const ADD_QUESTION = (state, payload) => {
  state.questions.unshift(payload);
};

const UPDATE_QUESTION = (state, payload) => {
  const idx = state.questions.findIndex(u => u.id === payload.id);

  if (idx >= 0) {
    Vue.set(state.questions, idx, payload);
  }
};

const DELETE_QUESTION = (state, payload) => {
  const idx = state.questions.findIndex(u => u.id === payload.id);

  if (idx >= 0) {
    Vue.delete(state.questions, idx);
  }
};

const SET_LOADING = (state, payload) => {
  state.isLoading = payload;
};

const SET_MODAL_LOADING = (state, payload) => {
  state.isModalLoading = payload;
};

const SET_MODAL_VISIBLE = (state, payload) => {
  state.isModalVisible = payload;
};

const SET_MODAL_ADD = (state, payload) => {
  state.isModalAdd = payload;
};
const SET_FORM = (state, payload) => {
  state.form = payload;
};

export default {
  SET_FORM,
  SET_QUESTIONS,
  ADD_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
  SET_LOADING,
  SET_MODAL_LOADING,
  SET_MODAL_VISIBLE,
  SET_MODAL_ADD,
};
