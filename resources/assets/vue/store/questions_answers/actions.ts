import axios from 'axios';
import checkResponse from '@/utils/checkResponse';

const loadQuestionsAnswers = async ({ commit }, payload) => {
  commit('SET_LOADING', true);

  try {
    const response = await axios.get(`questions_answers?survey_id=${payload.survey_id}`);
    const checkErrors = checkResponse(response);

    if (checkErrors) {
      commit('SET_DIALOG_MESSAGE', checkErrors.message, { root: true });
    } else {
      commit('SET_QUESTIONS_ANSWERS', response);
    }
  } catch (e) {
    commit('SET_DIALOG_MESSAGE', 'errors.generic_error', { root: true });
  } finally {
    commit('SET_LOADING', false);
  }
};

const setModalVisible = ({ commit }, payload) => {
  commit('SET_MODAL_VISIBLE', payload);
};

const setQuery = ({ commit }, payload) => {
  commit('SET_QUERY', payload);
};

export default {
  setQuery,
  loadQuestionsAnswers,
  setModalVisible,
};
