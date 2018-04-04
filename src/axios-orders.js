import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-29d1e.firebaseio.com/'
});

export default instance;
