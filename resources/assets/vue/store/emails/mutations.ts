import Vue from 'vue';

const SET_LOADING = (state, payload) => {
  state.isEmailLoading = payload;
};

const SET_MODAL_LOADING = (state, payload) => {
  state.isEmailModalLoading = payload;
};

const SET_MODAL_VISIBLE = (state, payload) => {
  state.isEmailModalVisible = payload;
};

const SET_MODAL_ADD = (state, payload) => {
  state.isEmailModalAdd = payload;
};
const SET_FORM = (state, payload) => {
  state.emailForm = payload;
};

export default {
  SET_FORM,
  SET_LOADING,
  SET_MODAL_LOADING,
  SET_MODAL_VISIBLE,
  SET_MODAL_ADD,
};
