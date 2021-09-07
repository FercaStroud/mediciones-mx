import axios from 'axios';
import checkResponse from '@/utils/checkResponse';

const addPhone = async ({ commit }, payload) => {

  const phone = {
    contact_id: payload.contact_id,
    name: payload.name,
    phone: payload.phone,
    primary: payload.primary,
  };

  commit('SET_MODAL_LOADING', true);

  try {
    const response = await axios.post('phones', phone);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      // commit('ADD_PHONE', response.data);
      commit('SET_MODAL_VISIBLE', false);
    }
  } catch {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  } finally {
    commit('SET_MODAL_LOADING', false);
  }
};

const editPhone = async ({ commit }, payload) => {
  const phone = {
    id: payload.id,
    contact_id: payload.contact_id,
    name: payload.name,
    phone: payload.phone,
    primary: payload.primary,
  };

  commit('SET_MODAL_LOADING', true);

  try {
    const response = await axios.put(`phones/${payload.id}`, phone);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      // commit('UPDATE_PHONE', response.data);
      commit('SET_MODAL_VISIBLE', false);
    }
  } catch {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  } finally {
    commit('SET_MODAL_LOADING', false);
  }
};

const deletePhone = async ({ commit }, payload) => {
  try {
    const response = await axios.delete(`phones/${payload.id}`);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      // commit('DELETE_PHONE', payload);
      commit('SET_DIALOG_MESSAGE', 'front.deleted_successfully', { root: true });
    }
  } catch {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  }
};

const setPhoneModalVisible = ({ commit }, payload) => {
  commit('SET_MODAL_VISIBLE', payload);
};

const setPhoneModalAdd = ({ commit }, payload) => {
  commit('SET_MODAL_ADD', payload);
};

const setPhoneForm = ({ commit }, payload) => {
  commit('SET_FORM', payload);
};

export default {
  setPhoneForm,
  setPhoneModalAdd,
  addPhone,
  editPhone,
  deletePhone,
  setPhoneModalVisible,
};
