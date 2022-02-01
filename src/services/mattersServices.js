import service from './service';
import store from "../store";

const resource = 'Matters';

export default{
    getMatterUser() {
        var url =
          `?$expand=Company,Responsible
          &$select=Order,Id,Name,TargetDate,Priority,IsCompleted,Color,CompanyId,ResponsibleId,Counter,
          Company/ShortName,
          Responsible/Initials
          &$orderby=Order
          &$filter=ResponsibleId eq ` +
          store.state.User.Id +
          " and IsCompleted eq false";
          return service.post(resource + url);
      },
}