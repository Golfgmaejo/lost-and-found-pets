import axios from 'axios';

export default apiClient = axios.create({
  baseURL: 'https://3hpsqzbj-5000.asse.devtunnels.ms', 
  headers: {
    'Content-Type': 'application/json'
  }
});
