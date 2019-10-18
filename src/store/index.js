import Vue from "vue";
import Vuex from "vuex";

import exprenses from "./exprenses";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    exprenses: exprenses
  }
});
