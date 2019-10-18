// import consola from 'consola';
import client from "../api/mock/index";

const state = {
  OpDates: [],
  AcctPos: [],
  OpEntry: [],
  Acct: [],
  AcctPosDB: [],
  AcctPosCr: []
};

const mutations = {
  setAcct(state, Acct) {
    state.Acct = Acct;
  },
  setOpDates(state, OpDates) {
    state.OpDates = OpDates;
  },
  setAcctPos(state, AcctPos) {
    state.AcctPos = AcctPos;
  },
  setOpEntry(state, OpEntry) {
    state.OpEntry = OpEntry;
  },
  addOpEntry(state, OpEntry) {
    state.OpEntry.push(OpEntry);
  },
  setAcctPosDB(state, AcctPos) {
    state.AcctPosDB = AcctPos;
  },
  setAcctPosCr(state, AcctPos) {
    state.AcctPosCr = AcctPos;
  },
  addAcctPos(state, pos) {
    state.AcctPos.push(pos);
  }
};

const actions = {
  async getAcct({ commit }) {
    let Acct = await client.fetchAcct();
    commit("setAcct", Acct);
  },
  async getOpDates({ commit }) {
    let OpDates = await client.fetchOpDate();
    commit("setOpDates", OpDates);
  },
  async getAcctPos({ commit }, params) {
    let AcctPos = await client.fetchAcctPos(params);
    commit("setAcctPos", AcctPos);
  },
  async getOpEntry({ commit, state }, params) {
    if (!state.OpEntry.length) {
      let OpEntry = await client.fetchOpEntry(params);
      commit("setOpEntry", OpEntry);
    }
  },
  async addOpEntry({ commit, state }, params) {
    var Pos = {};
    var Balance = 0;
    // Подготавливаем массивы проводок для дебетового и кредитных счетов
    var AcctPosDb = state.AcctPos.filter(x => x.AcctNum === params.AcctNumDB);
    var AcctPosCr = state.AcctPos.filter(x => x.AcctNum === params.AcctNumCr);
    // Проверяем есть ли в AcctPos пришедшая дата по дебетовому счету
    var checkDateInAcctPosDb = AcctPosDb.find(function(x) {
      if (x.OpDate.getDate() === params.OpDate.getDate()) return x;
    });
    // Проверяем есть ли в AcctPos пришедшая дата по кредитному счету
    var checkDateInAcctPosCr = AcctPosCr.find(function(x) {
      if (x.OpDate.getDate() === params.OpDate.getDate()) return x;
    });
    // Если пришедней даты по дебетовому счету нет в AcctPos, то добавляем ее
    if (!checkDateInAcctPosDb) {
      // Получаем предыдущий баланс по дебетовому счету
      // - Сортируем массив по дате в обратном порядке
      AcctPosDb.sort(function(a, b) {
        return new Date(b.OpDate) - new Date(a.OpDate);
      });
      // - Получаем баланс предыдущего дня
      Pos = AcctPosDb.find(function(x) {
        if (x.OpDate.getDate() <= params.OpDate.getDate()) return x;
      });
      if (Pos) {
        Balance = Pos.Balance - params.Amount;
      }
      // Добавляем новую дату по дебетовому счету в AcctPos
      commit("addAcctPos", {
        AcctNum: params.AcctNumDB,
        Balance: Balance,
        OpDate: params.OpDate
      });
    } else {
      checkDateInAcctPosDb.Balance -= params.Amount;
    }
    // Если пришедней даты по кредитному счету нет в AcctPos, то добавляем ее
    if (!checkDateInAcctPosCr) {
      // Получаем предыдущий баланс по кредитному счету
      // - Сортируем массив по дате в обратном порядке
      AcctPosCr.sort(function(a, b) {
        return new Date(b.OpDate) - new Date(a.OpDate);
      });
      // - Получаем баланс предыдущего дня
      Pos = AcctPosCr.find(function(x) {
        if (x.OpDate.getDate() <= params.OpDate.getDate()) return x;
      });
      if (Pos) {
        Balance = Pos.Balance + params.Amount;
      }
      // Добавляем новую дату по кредитному счету в AcctPos
      commit("addAcctPos", {
        AcctNum: params.AcctNumCr,
        Balance: Balance,
        OpDate: params.OpDate
      });
    } else {
      checkDateInAcctPosCr.Balance += params.Amount;
    }
    // Переписываем баланс последующих Проводок после пользовательской даты по дебетовому счету
    AcctPosDb.filter(function(x) {
      if (x.OpDate.getDate() > params.OpDate.getDate()) {
        x.Balance = x.Balance - params.Amount;
      }
    });
    // Переписываем баланс последующих Проводок после пользовательской даты по кредитному счету
    AcctPosCr.filter(function(x) {
      if (x.OpDate.getDate() > params.OpDate.getDate()) {
        x.Balance = x.Balance + params.Amount;
      }
    });
    // Добавляем новую проводку
    commit("addOpEntry", params);
  }
};

const getters = {
  lastOpDates(state) {
    return state.OpDates[state.OpDates.length - 1];
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
