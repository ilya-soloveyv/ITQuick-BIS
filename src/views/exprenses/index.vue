<template>
  <b-container>
    <h1 class="mt-3 mb-3">Счета</h1>
    <b-row>
      <b-col cols="auto">
        <b-form @submit="getAcctPos">
          <datepicker
            v-model="OpDate"
            :format="'d MMMM yyyy'"
            :language="locale"
            :bootstrap-styling="true"
            :highlighted="DatepickerHighlighted"
            :monday-first="true"
            :inline="true"
            @selected="getAcctPos"
            id="input-date"
          ></datepicker>
        </b-form>
      </b-col>
      <b-col>
        <b-table
          v-if="AcctPos.length"
          striped
          hover
          :items="AcctPos"
          :fields="fields"
          @row-clicked="goto"
        ></b-table>
        <b-alert v-else variant="warning" show>Не найдено</b-alert>
      </b-col>
    </b-row>
    <!-- <pre>{{ $store.state.exprenses.original_OpDate }}</pre> -->
  </b-container>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { ru } from "vuejs-datepicker/dist/locale";
export default {
  metaInfo: {
    title: "Счета"
  },
  data() {
    return {
      OpDate: null,
      locale: ru,
      fields: [
        {
          key: "AcctNum",
          sortable: true,
          label: "Номер счета"
        },
        {
          key: "Balance",
          sortable: true,
          label: "Баланс"
        }
      ]
    };
  },
  components: {
    Datepicker
  },
  async created() {
    await this.$store.dispatch("exprenses/getOpDates");
    this.$set(this, "OpDate", this.$store.getters["exprenses/lastOpDates"]);
    this.getAcctPos();
  },
  computed: {
    DatepickerHighlighted() {
      let obj = {};
      obj.dates = this.$store.state.exprenses.OpDates;
      return obj;
    },
    AcctPos() {
      return this.$store.state.exprenses.AcctPos;
    }
  },
  methods: {
    async getAcctPos() {
      this.$nextTick(() => {
        this.$store.dispatch("exprenses/getAcctPos", { OpDate: this.OpDate });
      });
    },
    goto(acct) {
      this.$router.push("/exprenses/" + acct.AcctNum);
    }
  }
};
</script>
