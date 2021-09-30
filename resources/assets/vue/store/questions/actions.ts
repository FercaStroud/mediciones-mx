import axios from 'axios';
import checkResponse from '@/utils/checkResponse';

const loadQuestions = async ({ commit }, payload) => {
  commit('SET_LOADING', true);

  try {
    const response = await axios.get(`questions?survey_id=${payload.survey_id}`);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      commit('SET_QUESTIONS', response);
    }
  } catch (e) {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  } finally {
    commit('SET_LOADING', false);
  }
};

const addQuestion = async ({ commit }, payload) => {

  const formData = new FormData();
  formData.append('input_type_id', payload.input_type_id);
  formData.append('survey_id', payload.survey_id);
  formData.append('title', payload.title);

  if (payload.src !== 'undefined' && payload.src !== undefined) {
    formData.append('src', payload.src);
  }

  if (payload.order !== 'undefined' && payload.order !== undefined) {
    formData.append('order', payload.order);
  }

  if (payload.required !== 'undefined' && payload.required !== undefined) {
    formData.append('required', payload.required);
  }

  commit('SET_MODAL_LOADING', true);

  try {
    const response = await axios.post('questions', formData);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      commit('ADD_QUESTION', response.data);
      commit('SET_MODAL_VISIBLE', false);
    }
  } catch {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  } finally {
    commit('SET_MODAL_LOADING', false);
  }
};

const editQuestion = async ({ commit }, payload) => {

  const formData = new FormData();
  formData.append('input_type_id', payload.input_type_id);
  formData.append('survey_id', payload.survey_id);
  formData.append('title', payload.title);
  formData.append('src', payload.src);
  formData.append('order', payload.order);

  commit('SET_MODAL_LOADING', true);

  try {
    const response = await axios.post(`questions/${payload.id}?_method=PUT`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      commit('UPDATE_QUESTION', response.data);
      commit('SET_MODAL_VISIBLE', false);
    }
  } catch {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  } finally {
    commit('SET_MODAL_LOADING', false);
  }
};

const deleteQuestion = async ({ commit }, payload) => {
  try {
    const response = await axios.delete(`questions/${payload.id}`);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      commit('DELETE_QUESTION', payload);
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
  loadQuestions,
  addQuestion,
  editQuestion,
  deleteQuestion,
  setModalVisible,
};
