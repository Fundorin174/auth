import { userSlice } from './slices/UserSlice';
import { AppDispatch } from "./index";
import UserService from "../services/userService";
import {authSlice} from "./slices/AuthSlice";
import AuthService from "../services/authService";
import {IUser} from "../models/User";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";

export const getUsers = ()=> async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.userFetching());
    const response = await UserService.fetchUsers()
    dispatch(userSlice.actions.userFetchingSuccess(response.data))
  } catch (error: any) {
    dispatch(userSlice.actions.userFetchingError(error.message))
  }
}

export const login = (email: string, password: string)=> async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.onStart());
    const response = await AuthService.login(email, password);
    console.log(response);
    localStorage.setItem('token', response.data.accesstoken);//save token
    dispatch(authSlice.actions.onSuccess(response.data.user))//save user
    dispatch(authSlice.actions.setAuth(true));//set flag
  } catch (error: any) {
    console.log(error)
    dispatch(authSlice.actions.onError(error.response?.data?.message));
  }
}

export const registration = (email: string, password: string, name: string, surname: string)=> async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.onStart());
    const response = await AuthService.registration(email, password, name, surname);
    localStorage.setItem('token', response.data.accesstoken);//save token
    dispatch(authSlice.actions.onSuccess(response.data.user))//save user. we don`t need another action
    dispatch(authSlice.actions.setAuth(true));//set flag
  } catch (error: any) {
    dispatch(authSlice.actions.onError(error.response?.data?.message));
  }
}

export const logout = ()=> async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.onStart());
    await AuthService.logout();
    localStorage.removeItem('token');//delete token
    dispatch(authSlice.actions.onSuccess({} as IUser))// save empty user
    dispatch(authSlice.actions.setAuth(false));//set flag
  } catch (error: any) {
    dispatch(authSlice.actions.onError(error.response?.data?.message));
  }
}

export const checkAuth = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.onStart());
    const response = await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}refresh`, {withCredentials: true});
    localStorage.setItem('token', response.data.accesstoken);//save token
    dispatch(authSlice.actions.onSuccess(response.data.user))//save user
    dispatch(authSlice.actions.setAuth(true));//set flag
  }catch (error: any) {
    console.log(error.response?.data?.message)
  }
}

