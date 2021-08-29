import Vue from 'vue';

const SET_CONTACTS = (state, payload) => {
  state.contacts = payload.data;
};

const ADD_CONTACT = (state, payload) => {
  state.contacts.unshift(payload);
};

const UPDATE_CONTACT = (state, payload) => {
  const idx = state.contacts.findIndex(u => u.id === payload.id);

  if (idx >= 0) {
    Vue.set(state.contacts, idx, payload);
  }
};

const DELETE_CONTACT = (state, payload) => {
  const idx = state.contacts.findIndex(u => u.id === payload.id);

  if (idx >= 0) {
    Vue.delete(state.contacts, idx);
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
  SET_CONTACTS,
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  SET_LOADING,
  SET_MODAL_LOADING,
  SET_MODAL_VISIBLE,
  SET_MODAL_ADD,
};
