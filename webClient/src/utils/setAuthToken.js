import axios from "axios";
export default () => {
    axios.defaults.withCredentials = true;
    axios.defaults.xsrfCookieName = 'authentication-token';
};
