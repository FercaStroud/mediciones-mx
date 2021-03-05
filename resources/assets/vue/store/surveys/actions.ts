import axios from 'axios';
import checkResponse from '@/utils/checkResponse';

const loadSurveyBySlug = async ({ commit }, payload) => {
  commit('SET_LOADING', true);

  try {
    const response = await axios.get(`survey/getBy/slug/${payload.slug}`);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      commit('SET_SURVEY', response);
    }
  } catch (e) {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  } finally {
    commit('SET_LOADING', false);
  }
};

const loadSurveys = async ({ commit }, payload) => {
  commit('SET_LOADING', true);

  try {
    const response = await axios.get(`surveys?user_id=${payload.user_id}`);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      commit('SET_SURVEYS', response);
    }
  } catch (e) {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  } finally {
    commit('SET_LOADING', false);
  }
};

const addSurvey = async ({ commit }, payload) => {

  const survey = {
    title: payload.title,
    slug: payload.slug,
    description: payload.description,
    //anonymized: payload.anonymized,
    //active: payload.active,
    welcome_text: payload.welcome_text,
    end_text: payload.end_text,
    //starts_at: payload.starts_at,
    //end_at: payload.end_at,
  };

  commit('SET_MODAL_LOADING', true);

  try {
    const response = await axios.post('surveys', survey);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      commit('ADD_SURVEY', response.data);
      commit('SET_MODAL_VISIBLE', false);
    }
  } catch {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  } finally {
    commit('SET_MODAL_LOADING', false);
  }
};

const editSurvey = async ({ commit }, payload) => {
  const survey = {
    title: payload.title,
    slug: payload.slug,
    description: payload.description,
    //anonymized: payload.anonymized,
    //active: payload.active,
    welcome_text: payload.welcome_text,
    end_text: payload.end_text,
    //starts_at: payload.starts_at,
    //end_at: payload.end_at,
  };

  commit('SET_MODAL_LOADING', true);

  try {
    const response = await axios.put(`surveys/${payload.id}`, survey);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      commit('UPDATE_SURVEY', response.data);
      commit('SET_MODAL_VISIBLE', false);
    }
  } catch {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  } finally {
    commit('SET_MODAL_LOADING', false);
  }
};

const deleteSurvey = async ({ commit }, payload) => {
  try {
    const response = await axios.delete(`surveys/${payload.id}`);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      commit('DELETE_SURVEY', payload);
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
  loadSurveys,
  loadSurveyBySlug,
  addSurvey,
  editSurvey,
  deleteSurvey,
  setModalVisible,
};
