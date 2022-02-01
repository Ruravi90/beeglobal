<template>
  <div class="c-modal-Trakers">
    <i class="bee bee-seguimiento" @click="showDialog = true"></i>

    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Seguimiento</md-dialog-title>

      
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>

export default {
  name: "Trakers",
  components: {
  },
  data: () => ({
    showDialog: false
  }),
  props: {
    //_Trakers: { type: Array, required:true },
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
