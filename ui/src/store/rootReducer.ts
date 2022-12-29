import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice';
import authReducer from './slices/AuthSlice';


const rootReducer = combineReducers({
  userReducer,
  authReducer,
});

export default rootReducer;
