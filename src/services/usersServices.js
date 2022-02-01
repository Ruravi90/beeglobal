import service from './service';
import store from "../store";

const resource = 'UsersClient';

export default{
    getResponsible() {
        var url =
        `?$expand=ProfilePhotos&$select=Id,Name,LastName,MothersLastName,Initials,UserName,ProfilePhotos/Data,ProfilePhotos/Extension
        &$filter=IsDelete eq false and InstanceId eq ` + store.state.User.InstanceId;

        return service.post(resource + url);
    },
}