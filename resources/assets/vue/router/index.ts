import Vue from 'vue';
import Router from 'vue-router';

import AuthLogin from '../views/AuthLogin.vue';
const AuthRegister = () => import('../views/AuthRegister.vue');
const AuthResetLink = () => import('../views/AuthResetLink.vue');
const AuthResetForm = () => import('../views/AuthResetForm.vue');

const Example = () => import('../views/Example.vue');
const Home = () => import('../views/Home.vue');
//const Messages = () => import('../views/Messages.vue');
const Users = () => import('../views/Users.vue');
const Surveys = () => import('../views/Surveys.vue');
const Dashboard = () => import('../views/Dashboard.vue');
const Questions = () => import('../views/Questions.vue');

import userTypes from '@/utils/userTypes';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: Vue.i18n.translate('strings.home', null),
        auth: {
          roles: userTypes.ADMIN,
          forbiddenRedirect: '/dashboard',
        },
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        title: Vue.i18n.translate('strings.dashboard', null),
        auth: true,
      },
    },
    {
      path: '/surveys',
      name: 'surveys',
      component: Surveys,
      meta: {
        title: Vue.i18n.translate('strings.surveys', null),
        auth: true,
      },
    },
    {
      path: '/questions/:survey_id',
      name: 'questions',
      component: Questions,
      meta: {
        title: Vue.i18n.translate('questions.text', null),
        auth: true
      },
    },
    /*{
      path: '/messages',
      name: 'messages',
      component: Messages,
      meta: {
        title: Vue.i18n.translate('strings.messages', null),
        auth: true,
      },
    },*/
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: {
        title: Vue.i18n.translate('strings.users', null),
        auth: {
          roles: userTypes.ADMIN,
          forbiddenRedirect: '/dashboard',
        },
      },
    },
    {
      path: '/login',
      name: 'auth.login',
      component: AuthLogin,
      meta: {
        title: Vue.i18n.translate('login.login', null),
        auth: false,
      },
    },
    {
      path: '/register',
      name: 'auth.register',
      component: AuthRegister,
      meta: {
        title: Vue.i18n.translate('login.register', null),
        auth: false,
      },
    },
    {
      path: '/password/reset',
      name: 'auth.reset',
      component: AuthResetLink,
      meta: {
        title: Vue.i18n.translate('login.reset_password', null),
        auth: false,
      },
    },
    {
      path: '/password/reset/:token',
      name: 'auth.reset.token',
      component: AuthResetForm,
      meta: {
        title: Vue.i18n.translate('login.reset_password', null),
        auth: false,
      },
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

// It's required for VueAuth
Vue.router = router;

export default router;
