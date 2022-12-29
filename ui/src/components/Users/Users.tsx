import React, {FC, memo, useEffect} from "react";
import {useDispatch, useSelector} from "../../store";
import {getUsers, logout} from "../../store/ActionsCreators";
import User from "./User";
import styles from './Users.module.scss';

const Users: FC = memo(() => {
  const {users, isLoading, error} = useSelector(state => state.userReducer)
  const {isAuth, user} = useSelector(state => state.authReducer)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUsers());
  }, [])

  const onLogout = ()=>{
    dispatch(logout())
  }
  return (
    <div>
      {isLoading && <div>Loading</div>}
      {error && <div>{error}</div>}
      {isAuth && <h2>{`Пользователь: ${user.name} ${user.surname}`}</h2>}
      {users &&
          <table className={styles.table}>
              <thead>
              <tr>
                  <th >Name</th>
                  <th >Surname</th>
                  <th >Email</th>
              </tr>
              </thead>
              <tbody>
              {users.map(user=>(<User key={user.email} data={user}/>))}
              </tbody>
          </table>
      }
      <button onClick={onLogout}>Выйти</button>
    </div>
  );
})

export default Users;