<template>
    <div class="c-conteiner settings" fluid>
      <md-toolbar class="md-accent" md-elevation="1">
      <h3 class="md-title" style="flex: 1">Equipos</h3>
      <md-button class="md-primary">Nuevo</md-button>
    </md-toolbar>
    <div class="c-tablet" >
      <vue-table-dynamic :params="params" ref="table"></vue-table-dynamic>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings",
  components: {
  },
  data: () => ({
    params: {
      data: [
        ['Index', 'Data1', 'Data2', 'Data3'],
        [1, 'b3ba90', '7c95f7', '9a3853'],
        [2, 'ec0b78', 'ba045d', 'ecf03c'],
        [3, '63788d', 'a8c325', 'aab418']
      ],
      header: 'row',
      enableSearch: true,
      pagination: true,
      pageSize: 5,
      pageSizes: [5, 10, 20, 50]
    }
  }),
  created() {
  },
  methods: {
  },
  mounted () {
  }
};
</script>
