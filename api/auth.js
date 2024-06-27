import apiClient from "./config_api"


export default {
    getRegister(data){
       return apiClient.post('/api/user/create',data)
    }
}