import {Suspense, lazy} from 'react';
import {RouteObject} from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";

const Loadable = (Component: any) => (props: any) => (
  <Suspense fallback={<div>{'loading...'}</div>}>
    <Component {...props} />
  </Suspense>
);

const Users = Loadable(lazy(() => import('./components/Users/Users')));

const routes: RouteObject[] = [
  {
    path: 'login',
    element: <LoginForm/>,
  },
  {
    path: '*',
    element: <Users/>,
  },
]

export default routes;