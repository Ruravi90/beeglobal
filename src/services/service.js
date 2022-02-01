import axios from "axios";
import store from "../store";

export default axios.create({
    baseURL: store.state.api,
    headers: store.state.headers,
});
