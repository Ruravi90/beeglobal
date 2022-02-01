<template>
 <popper
    trigger="clickToOpen"
    :options="{
      placement: 'left',
      modifiers: { offset: { offset: '0,10px' } }
    }">
    <div class="popper">
        <md-list>
            <md-list-item @click="deleteItem">Copiar</md-list-item>
            <md-list-item @click="deleteItem">Mover</md-list-item>
            <md-divider class="md-inset"></md-divider>
            <md-list-item @click="deleteItem">Eliminar</md-list-item>
        </md-list>
    </div>
    <i class="fa fa-cog" slot="reference"></i>
  </popper>
</template>

<script>
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';

export default {
  name: "ConfigTasks",
  components: {
      'popper': Popper
  },
  data: () => ({
    showOptions: false
  }),
  props: {
    //_Documents: { type: Array, required:true },
    callback: {
      type: Function,
    },
  },
    mounted() {
        
    },
  methods: {
    deleteItem() {
      if (this.callback) {
        this.callback();
      }
    },
  },
};
</script>
