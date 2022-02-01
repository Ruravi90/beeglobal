<template>
  <div>
    <md-button @click="open"> {{ this.showDate }}</md-button>
    <md-datepicker
      ref="picker"
      v-model="selectedDate"
      md-immediately
      v-on:md-closed="selected"
    />
  </div>
</template>

<script>
//import format from "date-fns/format";
import * as moment from "moment/moment";

export default {
  name: "SelectDate",
  data() {
    return {
      selectedDate: null,
      showDate: "",
    };
  },
  props: {
    Date: { type: String, default: null },
    callback: {
      type: Function,
    },
  },
  created() {
    this.showDate = moment(this.Date).format("DD-MM-YYYY");
    if (this.showDate == "Invalid date") {
      this.showDate = "Dia";
    } else {
      //this.selectedDate = format(new Date(this.showDate), "dd-MM-YYYY");
    }
  },
  methods: {
    selected() {
      if (this.callback && this.$refs.picker.localDate != null) {
        this.showDate = moment(this.$refs.picker.localDate).format(
          "DD-MM-YYYY"
        );
        this.callback(this.$refs.picker.localDate);
      }
    },
    open() {
      this.$refs.picker.toggleDialog();
    },
  },
};
</script>
