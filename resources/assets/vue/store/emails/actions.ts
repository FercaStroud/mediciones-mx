import axios from 'axios';
import checkResponse from '@/utils/checkResponse';

const addEmail = async ({ commit }, payload) => {

  const email = {
    contact_id: payload.contact_id,
    email: payload.email,
    primary: payload.primary,
  };

  commit('SET_MODAL_LOADING', true);

  try {
    const response = await axios.post('emails', email);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      // commit('ADD_EMAIL', response.data);
      commit('SET_MODAL_VISIBLE', false);
    }
  } catch {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  } finally {
    commit('SET_MODAL_LOADING', false);
  }
};

const editEmail = async ({ commit }, payload) => {
  const email = {
    id: payload.id,
    contact_id: payload.contact_id,
    email: payload.email,
    primary: payload.primary,
  };

  commit('SET_MODAL_LOADING', true);

  try {
    const response = await axios.put(`emails/${payload.id}`, email);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      // commit('UPDATE_EMAIL', response.data);
      commit('SET_MODAL_VISIBLE', false);
    }
  } catch {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  } finally {
    commit('SET_MODAL_LOADING', false);
  }
};

const deleteEmail = async ({ commit }, payload) => {
  try {
    const response = await axios.delete(`emails/${payload.id}`);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      // commit('DELETE_MAIL', payload);
      commit('SET_DIALOG_MESSAGE', 'front.deleted_successfully', { root: true });
    }
  } catch {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  }
};

const setEmailModalVisible = ({ commit }, payload) => {
  commit('SET_MODAL_VISIBLE', payload);
};

const setEmailModalAdd = ({ commit }, payload) => {
  commit('SET_MODAL_ADD', payload);
};

const setEmailForm = ({ commit }, payload) => {
  commit('SET_FORM', payload);
};

export default {
  setEmailForm,
  setEmailModalAdd,
  addEmail,
  editEmail,
  deleteEmail,
  setEmailModalVisible,
};
