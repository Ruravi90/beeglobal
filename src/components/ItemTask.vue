<template>
  <div class="list-group-item item-task" :data-id="task.Id">
    <input
      class="select-task"
      type="checkbox"
      v-model="task.Select"
      :name="'Task' + task.Id"
      :id="'Task' + task.Id"
    />
    <div class="content-matter-name">
      <a>{{ task.Matter ? task.Matter.Name : "" }}</a>
    </div>
    <div class="content-task-action">
      <input type="text" v-model="task.Action" />
    </div>
    <div class="content-task-name">
      <input type="text" v-model="task.Name" />
    </div>
    <div class="content-item-drag handle">
      <i class="fa fa-bars handle"></i>
    </div>
    <div class="content-task-reponsible">
      <SelectResponsible
        :IdResponsible="task.ResponsibleId"
        :callback="selectedResponsible"
      />
    </div>
    <div class="content-task-date">
      <SelectDate :Date="task.Date" :callback="selectedDate" />
    </div>
    <div class="content-btn-task">
      <button>
        <Trackers/>
      </button>
      <button>
        <Documents/>
      </button>
      <button>
        <i class="bee bee-completado"></i>
      </button>
      <button>
        <ConfigTask/>
      </button>
    </div>
  </div>
</template>

<script>
import SelectResponsible from "./SelectResponsible";
import SelectDate from "./SelectDate";
import Trackers from "./Trackers";
import Documents from "./Documents";
import ConfigTask from "./ConfigTask";

export default {
  name: "ItemTask",
  components: {
    SelectResponsible,
    SelectDate,
    Trackers,
    Documents,
    ConfigTask
  },
  props: {
    task: { type: Object, default: () => {} },
    callback: {
      type: Function,
    },
  },
  methods: {
    selected() {
      if (this.callback) {
        this.callback(this.task);
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
