import Vue from 'vue';

const SET_LOADING = (state, payload) => {
  state.isAddressLoading = payload;
};

const SET_MODAL_LOADING = (state, payload) => {
  state.isAddressModalLoading = payload;
};

const SET_MODAL_VISIBLE = (state, payload) => {
  state.isAddressModalVisible = payload;
};

const SET_MODAL_ADD = (state, payload) => {
  state.isAddressModalAdd = payload;
};
const SET_FORM = (state, payload) => {
  state.addressForm = payload;
};

export default {
  SET_FORM,
  SET_LOADING,
  SET_MODAL_LOADING,
  SET_MODAL_VISIBLE,
  SET_MODAL_ADD,
};
