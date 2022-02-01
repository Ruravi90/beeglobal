<template>
  <div class="c-app">
    <TheHeader />
    <router-view></router-view>
    <notifications group="app" position="top right" />
    <TheFooter />
  </div>
</template>

<script>
import { hubConnection } from 'signalr-no-jquery';
//import TheSidebar from "./TheSidebar";
import TheHeader from "./TheHeader";
import TheFooter from "./TheFooter";
import usersServices from "../services/usersServices";

export default {
  name: "TheContainer",
  components: {
    TheHeader,
    TheFooter,
  },
  created() {

    if (!("_Responsibles" in localStorage)) {
      usersServices.getResponsible().then((responsibles)=>{
        localStorage.setItem("_Responsibles", JSON.stringify(responsibles.data.value));
      });
    }

    this.$store.state.hubConnection = hubConnection(this.$store.state.urlHub);
    this.$store.state.hubConnection.qs = { 'UserId' : this.$store.state.User.Id };
    this.$store.state.hubConnection.logging = true;

    this.$store.state.hubProxyNotification = this.$store.state.hubConnection.createHubProxy('notifications');
    this.$store.state.hubProxyTask = this.$store.state.hubConnection.createHubProxy('TaskHub');
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
