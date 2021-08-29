import axios from 'axios';
import checkResponse from '@/utils/checkResponse';

const loadContacts = async ({ commit }, payload) => {
  commit('SET_LOADING', true);

  try {
    const response = await axios.get('contacts');
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      commit('SET_CONTACTS', response);
    }
  } catch (e) {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  } finally {
    commit('SET_LOADING', false);
  }
};

const addContact = async ({ commit }, payload) => {

  const contacts = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    secondLastName: payload.secondLastName,
  };

  commit('SET_MODAL_LOADING', true);

  try {
    const response = await axios.post('contacts', contacts);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      commit('ADD_CONTACT', response.data);
      commit('SET_MODAL_VISIBLE', false);
    }
  } catch {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  } finally {
    commit('SET_MODAL_LOADING', false);
  }
};

const editContact = async ({ commit }, payload) => {
  const contacts = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    secondLastName: payload.secondLastName,
  };

  commit('SET_MODAL_LOADING', true);

  try {
    const response = await axios.put(`contacts/${payload.id}`, contacts);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      commit('UPDATE_CONTACT', response.data);
      commit('SET_MODAL_VISIBLE', false);
    }
  } catch {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  } finally {
    commit('SET_MODAL_LOADING', false);
  }
};

const deleteContact = async ({ commit }, payload) => {
  try {
    const response = await axios.delete(`contact/${payload.id}`);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      commit('DELETE_CONTACT', payload);
      commit('SET_DIALOG_MESSAGE', 'front.deleted_successfully', { root: true });
    }
  } catch {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  }
};

const setModalVisible = ({ commit }, payload) => {
  commit('SET_MODAL_VISIBLE', payload);
};

const setModalAdd = ({ commit }, payload) => {
  commit('SET_MODAL_ADD', payload);
};

const setForm = ({ commit }, payload) => {
  commit('SET_FORM', payload);
};

export default {
  setForm,
  setModalAdd,
  loadContacts,
  addContact,
  editContact,
  deleteContact,
  setModalVisible,
};
