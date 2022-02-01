<template>
  <div class="speedDialAddElement">
    <button class="buttonAddElement" ref="buttonAddElement" @click="open">
      <i class="fa fa-plus"></i>
    </button>
    <div class="contentAddElement" ref="contentAddElement">
      <button @click="AddElement('task')">
        <i class="bee bee-tareas"></i>
      </button>
      <button @click="AddElement('matter')">
        <i class="bee bee-repo"></i>
      </button>
      <button @click="AddElement('document')">
        <i class="bee bee-carpeta"></i>
      </button>
      <button @click="AddElement('tracker')">
        <i class="bee bee-seguimiento"></i>
      </button>
      <button @click="AddElement('report')">
        <i class="bee bee-repo-clone"></i>
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
    open() {
      if (this.$refs.buttonAddElement.classList.contains("active")) {
        this.$refs.buttonAddElement.classList.remove("active");
        this.$refs.contentAddElement.classList.remove("active");
      } else {
        this.$refs.buttonAddElement.classList.add("active");
        this.$refs.contentAddElement.classList.add("active");
      }
    },
    AddElement(item) {
      this.$refs.buttonAddElement.classList.remove("active");
      this.$refs.contentAddElement.classList.remove("active");
      if (this.callback) {
        this.callback(item);
      }
    },
  },
};
</script>
