import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    form: {
      step1: {
        fields: {},
        valid: false
      },
      step2: {
        fields: {},
        valid: false
      }
    },
    formStep: null
  },
  getters: {
    form: state => {
      if (!state.formStep) {
        return;
      }
      return state.form[state.formStep];
    },
    formToSend: state => {
      if (!state.formStep) {
        return;
      }
      let form = {};
      const s2Fields = state.form.step2.fields;
      if (
        s2Fields.hasOwnProperty("delivery") &&
        s2Fields.delivery === "false"
      ) {
        const allowed = ["comment", "delivery"];
        const raw = state.form.step2.fields;
        let filtered = Object.keys(raw)
          .filter(key => allowed.includes(key))
          .reduce((obj, key) => {
            obj[key] = raw[key];
            return obj;
          }, {});
        form = {
          ...state.form.step1.fields,
					...filtered
        };
      } else {
        form = { ...state.form.step1.fields, ...state.form.step2.fields };
      }
      return form;
    }
  },
  mutations: {
    SET_FORM_STEP(state, { step }) {
      state.formStep = step;
    },
    SET_FORM_FIELD(state, { name, value }) {
      const fields = state.form[state.formStep].fields;
      if (fields[name]) {
        if (value === "" || !value.length) {
          Vue.delete(state.form[state.formStep].fields, name);
          return;
        }
        fields[name] = value;
      } else {
        Vue.set(state.form[state.formStep].fields, name, value);
      }
    },
    CLEAR_FORM_STEP(state, { step }) {
      state.form[step].fields = {};
      state.form[step].valid = false;
    }
  },
  actions: {
    setFormStep({ commit }, payload) {
      commit("SET_FORM_STEP", payload);
    },
    setFormField({ commit }, payload) {
      commit("SET_FORM_FIELD", payload);
    },
    clearFormStep({ commit }, payload) {
      commit("CLEAR_FORM_STEP", payload);
    },
    clearForm({ commit, state }) {
      for (const step in state.form) {
        if (state.form.hasOwnProperty(step)) {
          commit("CLEAR_FORM_STEP", { step: step });
        }
      }
    }
  }
});
