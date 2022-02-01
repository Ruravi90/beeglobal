<template>
  <div class="speedDialCalendar" @mouseover="Over" @mouseleave="Leave">
    <button class="buttonSelectCalendar" ref="buttonSelectCalendar">
      <i class="bee bee-calendario"></i>
    </button>
    <div class="contentSelectElement" ref="contentSelectElement">
      <button @click="select('today')">
        Dia
      </button>
      <button @click="select('week')">
        Semana
      </button>
      <button @click="select('month')">
        Mes
      </button>
      <button @click="select('all')">
        Todo
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpeedDialCalendar",
  data: () => ({}),
  props: {
    callback: {
      type: Function,
    },
  },
  created() {},
  mounted() {},
  methods: {
    Over() {
      this.$refs.buttonSelectCalendar.classList.add("active");
      this.$refs.contentSelectElement.classList.add("active");
    },
    Leave() {
      this.$refs.buttonSelectCalendar.classList.remove("active");
      this.$refs.contentSelectElement.classList.remove("active");
    },
    select(item) {
      this.$refs.buttonSelectCalendar.classList.remove("active");
      this.$refs.contentSelectElement.classList.remove("active");
      if (this.callback) {
        this.callback(item);
      }
    },
  },
};
</script>
