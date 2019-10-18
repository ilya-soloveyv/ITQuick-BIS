import Vue from "vue";
import VueRouter from "vue-router";

import Exprenses from "../views/exprenses/index";
import Exprense from "../views/exprenses/item";
import Operational from "../views/Operational";
import Transaction from "../views/Transaction";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "exprense"
  },
  {
    path: "/exprenses",
    name: "exprenses",
    component: Exprenses
  },
  {
    path: "/exprenses/:AcctNum",
    name: "exprense",
    component: Exprense
  },
  {
    path: "/operational",
    name: "operational",
    component: Operational
  },
  {
    path: "/transaction",
    name: "transaction",
    component: Transaction
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
