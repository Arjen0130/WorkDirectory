var axios= require('axios');

//全局的 axios 默认值
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.timeout = 1000 * 15;
axios.defaults.headers['Content-Type'] = 'application/json';




module.exports = axios;
