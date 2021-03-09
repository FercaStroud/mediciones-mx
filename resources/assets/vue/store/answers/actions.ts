import axios from 'axios';
import checkResponse from '@/utils/checkResponse';

const loadAnswers = async ({ commit }, payload) => {
  commit('SET_LOADING', true);

  try {
    const response = await axios.get(`answers?question_id=${payload.question_id}`);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      commit('SET_ANSWERS', response);
    }
  } catch (e) {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  } finally {
    commit('SET_LOADING', false);
  }
};

const addAnswer = async ({ commit }, payload) => {

  const formData = new FormData();
  formData.append('question_id', payload.question_id);

  if(payload.src !== "undefined" && payload.src !== undefined) {
    formData.append('src', payload.src);
  }
  if(payload.force_question_id !== "undefined" && payload.force_question_id !== undefined) {
    formData.append('force_question_id', payload.force_question_id);
  }
  formData.append('order', payload.order);
  formData.append('value', payload.value);
  formData.append('title', payload.title);
  formData.append('end_survey', payload.end_survey);

  if(payload.src !== "undefined" && payload.src !== undefined) {
    formData.append('src', payload.src);
  }

  commit('SET_MODAL_LOADING', true);

  try {
    const response = await axios.post('answers', formData);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      commit('ADD_ANSWER', response.data);
      commit('SET_MODAL_VISIBLE', false);
    }
  } catch {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  } finally {
    commit('SET_MODAL_LOADING', false);
  }
};

const editAnswer = async ({ commit }, payload) => {
  const formData = new FormData();
  formData.append('question_id', payload.question_id);

  if(payload.src !== "undefined" && payload.src !== undefined) {
    formData.append('src', payload.src);
  }
  if(payload.force_question_id !== "undefined" && payload.force_question_id !== undefined) {
    formData.append('force_question_id', payload.force_question_id);
  }


  formData.append('order', payload.order);
  formData.append('value', payload.value);
  formData.append('title', payload.title);
  formData.append('end_survey', payload.end_survey);

  commit('SET_MODAL_LOADING', true);

  try {
    const response = await axios.put(`answers/${payload.id}`, formData);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      commit('UPDATE_ANSWER', response.data);
      commit('SET_MODAL_VISIBLE', false);
    }
  } catch {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  } finally {
    commit('SET_MODAL_LOADING', false);
  }
};

const deleteAnswer = async ({ commit }, payload) => {
  try {
    const response = await axios.delete(`answers/${payload.id}`);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      commit('DELETE_ANSWER', payload);
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
  loadAnswers,
  addAnswer,
  editAnswer,
  deleteAnswer,
  setModalVisible,
};
