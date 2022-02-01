<template>
  <div class="c-body" fluid>
    <div class="c-list-matters" ref="contentListMatters">
      <SpeedDialAddElement :callback="addElement" />
      <div class="SelectView">
        <button
          class="buttonSelectView"
          v-bind:class="{
            matters: setView == 'listMatters',
          }"
          ref="buttonSelectView"
          @click="selectView"
        >
          <i
            class="bee"
            v-bind:class="{
              'bee-asunto-flecha': setView == 'globalTasks',
              'bee-tarea-flecha': setView == 'listMatters',
            }"
          ></i>
          <i class="count">{{ count }}</i>
        </button>
      </div>
      <SpeedDialCalendar :callback="selectCalendar" />
      <Matters v-if="setView == 'listMatters'"  :matters="Matters"/>
    </div>
    <div class="c-list-tasks active" ref="contentListTasks">
      <GlobalTasks v-if="setView == 'globalTasks'" />
    </div>
  </div>
</template>

<script>
import GlobalTasks from "../components/GlobalTasks";
import Matters from "../components/Matters";
import SpeedDialAddElement from "../components/SpeedDialAddElement";
import SpeedDialCalendar from "../components/SpeedDialCalendar";
import tasksServices from "../services/tasksServices";
import mattersServices from "../services/mattersServices";


export default {
  name: "Beeglobal",
  components: {
    GlobalTasks,
    Matters,
    SpeedDialAddElement,
    SpeedDialCalendar,
  },
  data: () => ({
    setView: "globalTasks",
    count: 0,
    Matters: [],
    Tasks: [],
  }),
  created() {
  },
  methods: {
    notif() {
      this.$notify({
        group: "app",
        type: "info",
        title: "Hola!",
        text: "Bienvenido",
      });
    },
    addElement(item) {
      console.log(item);
    },
    selectCalendar(item) {
      console.log(item);
    },
    selectView() {
      if (this.setView == "globalTasks") {
        this.setView = "listMatters";
        this.$refs.buttonSelectView.children[0].classList.add("hiden");
        this.$refs.buttonSelectView.children[1].classList.remove("hiden");
        this.$refs.contentListMatters.classList.add("active");
        this.$refs.contentListTasks.classList.remove("active");
        this.getMatters();
        
      } else {
        this.setView = "globalTasks";
        this.$refs.buttonSelectView.children[0].classList.remove("hiden");
        this.$refs.buttonSelectView.children[1].classList.add("hiden");
        this.$refs.contentListMatters.classList.remove("active");
        this.$refs.contentListTasks.classList.add("active");
        this.getTasks();
      }
    },
    getTasks(){
      if (this.setView == "globalTasks") {
        if (!("_Tasks" in localStorage)) {
          tasksServices.getTaskUser.then((tasks) => {
            this.notif();
            this.Tasks = tasks.data.value;
            localStorage.setItem("_Tasks", JSON.stringify(tasks.data.value));
          }).catch((error) => {
            console.error(error);
          });
        }else{
          this.count = JSON.parse(localStorage.getItem("_Tasks")).length;
        }
      }
    },
    getMatters(){
      if (this.setView == "listMatters") {
        if (!("_Matters" in localStorage)) {
          mattersServices.getMatterUser.then((matters) => {
            this.notif();
            this._Matters = matters.data.value;
            localStorage.setItem( "_Matters", JSON.stringify(matters.data.value));
          });
        }else{
          this.count = JSON.parse(localStorage.getItem("_Matters")).length;
        }
      }
    },
  },
  mounted () {
    this.$root.$on('advanceFilter',(filter) =>{
      console.log(filter);
    });

    if (this.$route.params['idMatter'] != undefined) {
      console.log(this.$route.params['idMatter']);
    }
    else{
       this.getTasks();
    }
    this.$store.state.hubProxyTask.on("addTask", () =>{
     });
    this.$store.state.hubProxyTask.on("editTask", () =>{
    });
    this.$store.state.hubProxyTask.on("deletedTask", () =>{
    });
    this.$store.state.hubProxyTask.on("resultMassiveUpdate", () =>{
    });
    this.$store.state.hubProxyTask.on("resultMassiveDeleted", () =>{
    });
    this.$store.state.hubProxyTask.on("getTask", () =>{
    });
    
  }
};
</script>
