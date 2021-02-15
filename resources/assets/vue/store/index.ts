import Vue from 'vue';

import 'promise-polyfill/src/polyfill';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

import messages from './messages';
import users from './users';
import surveys from './surveys';
import questions from './questions';
import answers from './answers';

Vue.use(Vuex);

const modules = {
  messages,
  users,
  surveys,
  questions,
  answers
};

const store = new Vuex.Store({
  modules,
  actions,
  getters,
  mutations,
  state,
});

export default store;
