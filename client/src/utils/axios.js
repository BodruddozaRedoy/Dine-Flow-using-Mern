import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 
      window.location.hostname === 'localhost' 
        ? 'http://localhost:5000' 
        : 'https://dine-flow-server.vercel.app',
    withCredentials: true
});

// export const axiosInstance = axios.create({
//   baseURL: 'https://dine-flow-server.vercel.app',
//   withCredentials: true
// })
