<template>
  <md-menu
  
  md-size="small"
  :mdCloseOnClick="closeOnClick"
  :mdCloseOnSelect="closeOnSelect"
  >
    <md-button md-menu-trigger>{{ Responsible.Initials }}</md-button>

    <md-menu-content class="content-responsible">
      <md-menu-item
        v-for="responsible of _Responsibles"
        v-bind:key="responsible.Id"
        @click="selected(responsible)"
        >
        {{ responsible.Initials }}
        </md-menu-item
      >
    </md-menu-content>
  </md-menu>
</template>

<script>
export default {
  name: "SelectResponsible",
  data: () => ({
    Responsible: {
      Id: Number,
      Name: String,
      Initials: String,
    },
    _Responsibles: [],
    closeOnClick: false,
    closeOnSelect: true,
    base64:''
  }),
  props: {
    IdResponsible: { type: Number, default: 0 },
    callback: {
      type: Function,
    },
  },
  created() {
    this._Responsibles = JSON.parse(localStorage.getItem("_Responsibles"));
    let index = this._Responsibles.findIndex((r) => r.Id == this.IdResponsible);
    this.Responsible = this._Responsibles[index];
    //this.base64 = 'data:image/'+this.responsible.ProfilePhotos[0].Extension+';base64,'+this.responsible.ProfilePhotos[0].Data
  },
  mounted() {},
  methods: {
    selected(item) {
      if (this.callback) {
        this.Responsible = item;
        this.callback(item);
      }
    },
  },
};
</script>
