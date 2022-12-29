import React, {useEffect} from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import {useDispatch, useSelector} from "./store";
import LoginForm from "./components/LoginForm/LoginForm";
import {checkAuth} from "./store/ActionsCreators";

function App() {

  const isAuth = useSelector(state => state.authReducer.isAuth);
  const dispatch = useDispatch();
  const content = useRoutes(routes);

  useEffect(()=>{
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  },[])

  return (
    <div className="App">
      {isAuth ? content : <LoginForm />}
    </div>
  );
}

export default App;
