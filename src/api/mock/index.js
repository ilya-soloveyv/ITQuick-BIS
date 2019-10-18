// import consola from 'consola'
import { Acct } from "./data/Acct";
import { AcctPos } from "./data/AcctPos";
import { OpDate } from "./data/OpDate";
import { OpEntry } from "./data/OpEntry";

export default {
  test() {
    console.log(Acct);
    console.log(AcctPos);
    console.log(OpDate);
    console.log(OpEntry);
  },
  fetchOpDate() {
    let response = [];
    OpDate.forEach(date => {
      response.push(new Date(date.OpDate));
    });
    return response;
  },
  fetchAcct() {
    let response = [];
    Acct.forEach(acct => {
      response.push(acct.AcctNum);
    });
    return response;
  },
  fetchAcctPos(params = {}) {
    let response = [];
    if (params.hasOwnProperty("OpDate")) {
      response = AcctPos.filter(
        x => new Date(x.OpDate).getTime() === params.OpDate.getTime()
      );
    } else if (params.hasOwnProperty("AcctNum")) {
      response = AcctPos.filter(x => x.AcctNum === params.AcctNum);
    } else {
      response = AcctPos;
    }
    response.forEach(pos => {
      pos.OpDate = new Date(pos.OpDate);
    });
    return response;
  },
  fetchOpEntry({ AcctNum }) {
    let response = [];
    let OpEntryList = OpEntry.filter(
      x => x.AcctNumCr === AcctNum || x.AcctNumDB === AcctNum
    );
    OpEntryList.forEach(item => {
      item.OpDate = new Date(item.OpDate);
      response.push(item);
    });
    return response;
  }
};
