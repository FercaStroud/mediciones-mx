import Vue from 'vue';

const SET_LOADING = (state, payload) => {
  state.isPhoneLoading = payload;
};

const SET_MODAL_LOADING = (state, payload) => {
  state.isPhoneModalLoading = payload;
};

const SET_MODAL_VISIBLE = (state, payload) => {
  state.isPhoneModalVisible = payload;
};

const SET_MODAL_ADD = (state, payload) => {
  state.isPhoneModalAdd = payload;
};
const SET_FORM = (state, payload) => {
  state.phoneForm = payload;
};

export default {
  SET_FORM,
  SET_LOADING,
  SET_MODAL_LOADING,
  SET_MODAL_VISIBLE,
  SET_MODAL_ADD,
};
