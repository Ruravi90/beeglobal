<template>
  <div class="list-matters">
    <div v-for="matter of _Matters"
        v-bind:key="matter.Id">  </div>
  </div>
</template>

<script>

export default {
  name: "Matters",
  components: {
  },
  props: {
    _Matters: { type: Array, required:true },
    callback: {
      type: Function,
    },
  },
  methods: {
    selected() {
      if (this.callback) {
        this.callback();
      }
    },
    selectedResponsible(result) {
      console.log(result);
    },
    selectedDate(result) {
      console.log(result);
    },
  },
};
</script>
