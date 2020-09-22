import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://western-net-251207.firebaseio.com/',
});

export default instance;
