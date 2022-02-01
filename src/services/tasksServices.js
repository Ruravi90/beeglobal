import service from './service';
import store from "../store";

const resource = 'Tasks';

export default{
    getTaskUser(){
        var url =
        `/AllTasks?$expand=Matter,
        Matter/Client,
        Matter/Company,
        Matter/TagsMatter,
        MatterTrackers,
        ElementsCheckLists
        &$select=Id,Action,Name,Detail,ResponsibleId,Date,StatusId,MatterId,Order,IsCompleted
        ,Matter/Id,Matter/Name,Matter/Nomenclature,Matter/Identifier,Matter/ExternalReference,Matter/Priority
        ,Matter/Client/ShortName
        ,Matter/Company/ShortName
        ,Matter/TagsMatter/Name
        ,MatterTrackers/Id,MatterTrackers/System
        ,ElementsCheckLists/Id,ElementsCheckLists/IsComplete
        &$filter=ResponsibleId eq ` +
        store.state.User.Id +
        " and IsCompleted eq false"+
        " and InstanceId eq " + store.state.User.InstanceId;

        return service.post(resource + url);
    },
    /*
    checkedMyTasks(context) {
      const user = this.state.User;
      var url =
        `/Tasks/AllTasks?$select=Id
        &$filter=ResponsibleId eq ` +
        user.Id +
        " and IsCompleted eq false";

      return new Promise((resolve, reject) => {
        axios
          .post(url, {
            headers: context.state.headers,
          })
          .then((response) => {
            localStorage.setItem("_Tasks", JSON.stringify(response.data.value));
            resolve(response.data.value);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    },
    setOrderTasks(context, Order) {
      var url = `/Tasks/NewOrder`;

      return new Promise((resolve, reject) => {
        axios
          .post(url, Order, {
            headers: context.state.headers,
          })
          .then((response) => {
            resolve(response.data.value);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    },*/
}