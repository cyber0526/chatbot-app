import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://server-chatbot.run.goorm.io/',
    timeout: 5000
});

export default instance