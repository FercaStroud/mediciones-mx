import Vue from 'vue';

const SET_SURVEYS = (state, payload) => {
  state.surveys = payload.data;
};

const ADD_SURVEY = (state, payload) => {
  state.surveys.unshift(payload);
};

const UPDATE_SURVEY = (state, payload) => {
  const idx = state.surveys.findIndex(u => u.id === payload.id);

  if (idx >= 0) {
    Vue.set(state.surveys, idx, payload);
  }
};

const DELETE_SURVEY = (state, payload) => {
  const idx = state.surveys.findIndex(u => u.id === payload.id);

  if (idx >= 0) {
    Vue.delete(state.surveys, idx);
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
  SET_SURVEYS,
  ADD_SURVEY,
  UPDATE_SURVEY,
  DELETE_SURVEY,
  SET_LOADING,
  SET_MODAL_LOADING,
  SET_MODAL_VISIBLE,
  SET_MODAL_ADD,
};
