<template>
  <div class="c-app">
    <TheHeader />
    <div class="c-body">
      <div class="c-sidebar settings">
        <md-list :md-expand-single="expandSingle">
          <md-list-item to="/settings/profile" exact>Mi perfil <code>/</code></md-list-item>
          <md-list-item to="/settings/users" exact>Usuarios <code>/</code></md-list-item>
          <md-list-item to="/settings/roles" exact>Roles <code>/</code></md-list-item>
          <md-list-item to="/settings/teams" exact>Equipos <code>/</code></md-list-item>
          <md-list-item to="/settings/clients" exact>Clientes <code>/</code></md-list-item>
          <md-list-item md-expand>
            <span class="md-list-item-text">Plantillas</span>
            <md-list slot="md-expand">
              <md-list-item class="md-inset" to="/settings/template-matter">Asuntos <code>/</code></md-list-item>
            </md-list>
          </md-list-item>
          <md-list-item md-expand>
            <span class="md-list-item-text">Catalogos</span>
            <md-list slot="md-expand">
              <md-list-item class="md-inset" to="/settings/cat-matter" exact>Tipo de Asuntos <code>/</code></md-list-item>
            </md-list>
          </md-list-item>
        </md-list>
      </div>
      <router-view></router-view>
    </div>
    <notifications group="app" position="top right" />
    <TheFooter />
  </div>
</template>

<script>
import { hubConnection } from 'signalr-no-jquery';
import TheHeader from "./TheHeader";
import TheFooter from "./TheFooter";

export default {
  name: "TheContainerSettings",
  components: {
    TheHeader,
    TheFooter,
  },
  data:()=>({
    expandSingle:false
  }),
  created() {
    this.$store.state.hubConnection = hubConnection(this.$store.state.urlHub);
    this.$store.state.hubConnection.qs = { 'UserId' : this.$store.state.User.Id };
    this.$store.state.hubConnection.logging = true;
    this.$store.state.hubProxyNotification = this.$store.state.hubConnection.createHubProxy('notifications');
/*
    this.$store.state.hubConnection.start().done(() =>{
      //this.$store.state.hubProxyTask.invoke("setDummy",this.$store.state.hubConnection.id,"Ruravi");
      this.$store.state.hubProxyNotification.invoke("bgNotification", 1)
      .fail((res) => {
        console.log("bgNotification error",res);
      });
    });

    this.$store.state.hubConnection.disconnected((res) => {
      console.log("SignalR disconnected",res);
      setTimeout(() => {
        this.$store.state.hubConnection.start();
      }, 5000); // Restart connection after 5 seconds.
    }); 
    */
  },
};
</script>
