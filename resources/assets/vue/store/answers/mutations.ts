import Vue from 'vue';

const SET_ANSWERS = (state, payload) => {
  state.answers = payload.data;
};

const ADD_ANSWER = (state, payload) => {
  state.answers.unshift(payload);
};

const UPDATE_ANSWER = (state, payload) => {
  const idx = state.answers.findIndex(u => u.id === payload.id);

  if (idx >= 0) {
    Vue.set(state.answers, idx, payload);
  }
};

const DELETE_ANSWER = (state, payload) => {
  const idx = state.answers.findIndex(u => u.id === payload.id);

  if (idx >= 0) {
    Vue.delete(state.answers, idx);
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
  SET_ANSWERS,
  ADD_ANSWER,
  UPDATE_ANSWER,
  DELETE_ANSWER,
  SET_LOADING,
  SET_MODAL_LOADING,
  SET_MODAL_VISIBLE,
  SET_MODAL_ADD,
};
