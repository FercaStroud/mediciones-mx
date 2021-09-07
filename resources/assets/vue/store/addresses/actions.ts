import axios from 'axios';
import checkResponse from '@/utils/checkResponse';

const addAddress = async ({ commit }, payload) => {

  const address = {
    contact_id: payload.contact_id,
    street_name: payload.street_name,
    street_number: payload.street_number,
    street_number_int: payload.street_number_int,
    country: payload.country,
    state: payload.state,
    city: payload.city,
    zipcode: payload.zipcode,
    other_details: payload.other_details,
    primary: payload.primary,
  };

  commit('SET_MODAL_LOADING', true);

  try {
    const response = await axios.post('addresses', address);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      // commit('ADD_ADDRESS', response.data);
      commit('SET_MODAL_VISIBLE', false);
    }
  } catch {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  } finally {
    commit('SET_MODAL_LOADING', false);
  }
};

const editAddress = async ({ commit }, payload) => {
  const address = {
    id: payload.id,
    contact_id: payload.contact_id,
    street_name: payload.street_name,
    street_number: payload.street_number,
    street_number_int: payload.street_number_int,
    country: payload.country,
    state: payload.state,
    city: payload.city,
    zipcode: payload.zipcode,
    other_details: payload.other_details,
    primary: payload.primary,
  };

  commit('SET_MODAL_LOADING', true);

  try {
    const response = await axios.put(`addresses/${payload.id}`, address);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      // commit('UPDATE_ADDRESS', response.data);
      commit('SET_MODAL_VISIBLE', false);
    }
  } catch {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  } finally {
    commit('SET_MODAL_LOADING', false);
  }
};

const deleteAddress = async ({ commit }, payload) => {
  try {
    const response = await axios.delete(`addresses/${payload.id}`);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      // commit('DELETE_ADDRESS', payload);
      commit('SET_DIALOG_MESSAGE', 'front.deleted_successfully', { root: true });
    }
  } catch {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  }
};

const setAddressModalVisible = ({ commit }, payload) => {
  commit('SET_MODAL_VISIBLE', payload);
};

const setAddressModalAdd = ({ commit }, payload) => {
  commit('SET_MODAL_ADD', payload);
};

const setAddressForm = ({ commit }, payload) => {
  commit('SET_FORM', payload);
};

export default {
  setAddressForm,
  setAddressModalAdd,
  addAddress,
  editAddress,
  deleteAddress,
  setAddressModalVisible,
};
