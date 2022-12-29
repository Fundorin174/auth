import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {AuthResponse} from "../models/response/AuthResponse";

// interceptor
const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});
// add token to all requests
$api.interceptors.request.use((config: AxiosRequestConfig<any>)=>{
  if (!config.headers) return config;
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

$api.interceptors.response.use((config: AxiosResponse)=>{
  return config;
}, async (error)=>{
  const originalRequest = error.config;
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}refresh`, {withCredentials: true});
      localStorage.setItem('token', response.data.accesstoken);//save token
      return $api.request(originalRequest);
    }catch (e) {
      console.log('Not autorized')
    }
  }
  throw error;
})

export default $api


