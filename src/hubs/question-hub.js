import { hubConnection } from 'signalr-no-jquery';

const _hubConnection = hubConnection('http://localhost:29055/signalr');
_hubConnection.qs = { 'userId': 1 };

const hubProxyTask = _hubConnection.createHubProxy('TaskHub');
console.log(hubProxyTask);
const hubProxyNotification = _hubConnection.createHubProxy('notifications');
console.log(hubProxyNotification);

_hubConnection.start({ jsonp: true }).done(function (hub) {
  console.info(hub);
  hubProxyNotification.invoke("bgNotification", 1)
      .fail(function (res) {
        console.log("bgNotification error",res);
      }); 
});
_hubConnection.disconnected(function (res) {
  console.log("SignalR disconnected",res);
  setTimeout(function () {
    _hubConnection.start({ jsonp: true });
  }, 5000); // Restart connection after 5 seconds.
}); 

hubProxyNotification.on("msjNotification", function (UserId) {
  console.log("Resived msjNotification", UserId);
});
