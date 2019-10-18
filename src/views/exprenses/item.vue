<template>
  <b-container>
    <h1 class="mt-3 mb-3">Счет #{{ AcctNum }}</h1>
    <b-table
      striped
      hover
      :items="OpEntry"
      :fields="fields"
      :sort-by.sync="sortBy"
    ></b-table>
    <b-form @submit.prevent="addOpEntry">
      <h3 class="mt-3 mb-3">Добавление операции</h3>
      <b-row>
        <b-col>
          <b-form-group id="label-OpDate" label="Дата" label-for="input-OpDate">
            <datepicker
              v-model="form.OpDate"
              :format="'d MMMM yyyy'"
              :language="locale"
              :bootstrap-styling="true"
              :monday-first="true"
              id="input-OpDate"
            ></datepicker>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="label-AcctNumDB"
            label="Счет дебета"
            label-for="input-AcctNumDB"
          >
            <b-form-select
              id="input-AcctNumDB"
              v-model="form.AcctNumDB"
              :options="Acct"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="label-AcctNumCr"
            label="Счет кредита"
            label-for="input-AcctNumCr"
          >
            <b-form-select
              id="input-AcctNumCr"
              v-model="form.AcctNumCr"
              :options="Acct"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="label-Amount"
            label="Сумма"
            label-for="input-Amount"
          >
            <b-form-input
              id="input-Amount"
              v-model.number="form.Amount"
              type="text"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-button type="submit" variant="primary">Добавить</b-button>
    </b-form>
    <h3 class="mt-5 mb-3">Баланс выбранных счетов по дням</h3>
    <b-row>
      <b-col>
        <div><strong>Дебетовый счет</strong></div>
        <div>{{ form.AcctNumDB }}</div>
        <b-table
          striped
          hover
          :items="AcctPosDB"
          :fields="AcctPosFields"
          :sort-by.sync="sortBy"
        ></b-table>
        <!-- {{ AcctPosDB }} -->
      </b-col>
      <b-col>
        <div><strong>Кредитный счет</strong></div>
        <div>{{ form.AcctNumCr }}</div>
        <b-table
          striped
          hover
          :items="AcctPosCr"
          :fields="AcctPosFields"
          :sort-by.sync="sortBy"
        ></b-table>
        <!-- {{ AcctPosCr }} -->
      </b-col>
    </b-row>
    <!-- <pre>{{ $store.state.exprenses.AcctPos }}</pre> -->
  </b-container>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { ru } from "vuejs-datepicker/dist/locale";
export default {
  data() {
    return {
      AcctNum: this.$route.params.AcctNum,
      locale: ru,
      sortBy: "OpDate",
      fields: [
        {
          key: "OpDate",
          sortable: true,
          label: "Дата"
        },
        {
          key: "AcctNumDB",
          sortable: true,
          label: "Счет дебета"
        },
        {
          key: "AcctNumCr",
          sortable: true,
          label: "Счет кредита"
        },
        {
          key: "Amount",
          sortable: true,
          label: "Сумма проводки"
        }
      ],
      AcctPosFields: [
        {
          key: "OpDate",
          label: "Дата"
        },
        {
          key: "Balance",
          label: "Баланс"
        }
      ],
      form: {
        OpDate: new Date(Date.UTC(2019, 6, 13)),
        AcctNumDB: "10201810000000010019",
        AcctNumCr: "47441810000200000020",
        Amount: 90
      }
    };
  },
  components: {
    Datepicker
  },
  async created() {
    await this.$store.dispatch("exprenses/getOpEntry", {
      AcctNum: this.AcctNum
    });
    await this.$store.dispatch("exprenses/getAcct");
    await this.$store.dispatch("exprenses/getAcctPos");
  },
  computed: {
    OpEntry() {
      return this.$store.state.exprenses.OpEntry;
    },
    Acct() {
      return this.$store.state.exprenses.Acct;
    },
    AcctPos() {
      return this.$store.state.exprenses.AcctPos;
    },
    AcctPosDB() {
      return this.AcctPos.filter(x => x.AcctNum === this.form.AcctNumDB);
    },
    AcctPosCr() {
      return this.AcctPos.filter(x => x.AcctNum === this.form.AcctNumCr);
    }
  },
  methods: {
    async addOpEntry() {
      let OpEntry = Object.assign({}, this.form);
      await this.$store.dispatch("exprenses/addOpEntry", OpEntry);
    }
  }
};
</script>
