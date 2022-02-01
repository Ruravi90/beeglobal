<template>
  <div class="wrapper md-elevation-3">
    <div class="c-list-Tasks" ref="Tasks" v-dragula="_Tasks" bag="bag">
      <div class="c-header-tasks">
        <div class="header-priority">
          <i class="fa fa-dot-circle-o"></i>
        </div>
        <div class="header-selected">
          <input class="select-task" type="checkbox" />
        </div>
        <div class="header-matter-name">
          <i class="bee bee-bandeja"></i>
        </div>
        <div class="header-task-action">
          <i class="bee bee-magic"></i>
        </div>
        <div class="header-task-name ">
          <i class="bee bee-tareas"></i>
        </div>
        <div class="header-task-reponsible">
          <i class="bee bee-usuario"></i>
        </div>
        <div class="header-task-date">
          <i class="bee bee-calendario"></i>
        </div>
        <div class="header-filter">
          <i class="bee bee-sin-completar"></i>
          <i class="bee bee-completados"></i>
        </div>
      </div>

      <ItemTask
        v-for="task of _Tasks"
        v-bind:key="task.Id"
        :task="task"
        :callback="openModalTask"
      />
    </div>

    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>{{ SelectedTask.Name }}</md-dialog-title>
      <md-dialog-content>
        <md-field>
          <label for="Action">Action</label>
          <md-input
            type="text"
            name="Action"
            id="Action"
            v-model="SelectedTask.Action"
          />
        </md-field>
        <md-field>
          <label for="Name">Name</label>
          <md-input
            type="text"
            name="Name"
            id="Name"
            v-model="SelectedTask.Name"
          />
        </md-field>
        <md-field>
          <label>Detail</label>
          <md-textarea
            v-model="SelectedTask.Detail"
            name="'Task'+SelectedTask.Id"
          ></md-textarea>
        </md-field>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false"
          >Close</md-button
        >
        <md-button class="md-primary" @click="showDialog = false"
          >Save</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import ItemTask from "./ItemTask";

export default {
  name: "GlobalTasks",
  components: {
    ItemTask,
    //draggable,
  },
  data: () => ({
    _Tasks:  { type: Array, required:true },
    SelectedTask: {
      Id: null,
      Action: null,
      Name: null,
      Detail: null,
      ResponsibleId: null,
      Date: null,
      StatusId: null,
      MatterId: null,
      Order: null,
      IsCompleted: null,
    },
    showDialog: false,
    drag: false,
  }),
  created() {
    let context = this;
    Vue.vueDragula.options("bag", {
      direction: "vertical",
      moves: function(el, container, handle) {
        container;
        return handle.classList.contains("handle"); // elements are always draggable by default
      },
      accepts: function(el) {
        el.classList.add("md-elevation-4");
        return true; // elements can be dropped in any of the `containers` by default
      },
    });

    Vue.vueDragula.eventBus.$on("dragend", function(args) {
      args[1].classList.remove("md-elevation-4");
      context.onMove();
    });

    this._Tasks = JSON.parse(localStorage.getItem("_Tasks"));
  },
  mounted() {},
  methods: {
    openModalTask(_Task) {
      console.log(_Task);
      this.SelectedTask = _Task;
      this.showDialog = true;
    },
    onMove() {
      let newOrder = {
        Order: [],
      };
      this.$refs.Tasks.children.forEach((el) => {
        if (el._prevClass != "c-header-tasks") {
          newOrder.Order.push(Number(el.attributes["data-id"].value));
        }
      });

      this.$store.dispatch("setOrderTasks", newOrder);
    },
  },
};
</script>
