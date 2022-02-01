<template>
  <div class="c-modal-Documents">
    <i class="bee bee-carpeta"  @click="showDialog = true"></i>

    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Documentos</md-dialog-title>

      
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>

export default {
  name: "Documents",
  components: {
  },
  data: () => ({
    showDialog: false
  }),
  props: {
    //_Documents: { type: Array, required:true },
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
