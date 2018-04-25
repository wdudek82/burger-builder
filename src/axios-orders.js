import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-ca36f.firebaseio.com/';
});

export default instance;