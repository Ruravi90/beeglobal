<template>
  <div class="c-header">
    <div class="c-header-logo">
      <router-link to="/beeglobal" >
        <img src="../assets/img/logo-beeglobal-bco.svg" />
      </router-link>
    </div>
    <div class="c-header-input">
      <div class="content-search">
        <input type="text" :placeholder="iconInputSearch"/>
        <button type="button" @click="showDialog=true"><i class="fa fa-plus"></i></button>
      </div>
      <div class="content-refresh">
        <button type="button"><i class="fa fa-refresh"></i></button>
      </div>
    </div>


    <div class="c-header-button">
      <md-menu md-size="small" class="menu-notification" md-align-trigger>
        <i class="fa fa-bell" md-menu-trigger></i>
        <md-menu-content class="content-notification">
          <md-menu-item
            v-for="notify of Notifications"
            v-bind:key="notify.Id" >
            {{ notify.Title }}
          </md-menu-item>
        </md-menu-content>
      </md-menu>

      <md-menu md-size="small"  class="menu-user" md-align-trigger>
        <img md-menu-trigger v-bind:src="base64"/>
        <md-menu-content class="content-user" >
          <md-menu-item
            v-for="user of Users"
            v-bind:key="user.Id"
            @click="selected(user)"
            >
            {{ user.Initials }}
          </md-menu-item>
        </md-menu-content>
      </md-menu>

      <md-menu md-size="small" class="menu-config" md-align-trigger>
        <i class="bee bee-configuracion" md-menu-trigger></i>
        <md-menu-content class="content-config">
          <md-menu-item to="/settings/profile">Configuracion</md-menu-item>
          <md-menu-item to="/logout">Cerrar sesion</md-menu-item>
        </md-menu-content>
      </md-menu>
    </div>


    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>BÚSQUEDA AVANZADA</md-dialog-title>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

  </div>
</template>

<script>
export default {
  name: "TheHeader",
  data:() => ({
    User:null,
    Users:[],
    Notifications:[],
    base64:'',
    showDialog:false,
    iconInputSearch:'\uf002',
    filter: {
        Name: null,
        IsCompleted: false,
        IsActive: true,
        ResponsibleId: null,
        Area: null,
        FilterDate: 'Today',
        Date: new Date(),
        MatterId: null
    },
    advance: {
      Name: '',
      ClientId: 0,
      CompanyId: 0,
      TagsId: 0,

      Nomenclature: '',
      IsCompleted: false,
      WithoutDate: null,

      DateFrom: '',
      DateTo: '',

      InMatters: true,
      InTasks: false,
      InSubTasks: false,
      InTracks: false,
      InDocs: false,
      InTeams: false,
      InTypeMatter:false
    }
  }),
  created() {
    this.Users = JSON.parse(localStorage.getItem("_Responsibles"));
    this.User = JSON.parse(localStorage.getItem("_User"));
    if(this.User.ProfilePhotos != undefined){
      this.base64 = 'data:image/'+this.User.ProfilePhotos[0].Extension+';base64,'+this.User.ProfilePhotos[0].Data
    }
    
  },
  methods:{
    onFilter(){
        this.$root.$emit('advanceFilter',this.filter);
    },
    selected(){

    }
  },
  mounted () {
    this.$store.state.hubProxyNotification.on("msjNotification", (response) =>{
      this.Notifications = response;
    });
    this.$store.state.hubProxyNotification.on("popupNotification", () =>{
        
    });
    
  }
};
</script>
