import React, {FC} from "react";
import {IUser} from "../../models/User";

interface IProps {
  data: IUser;
}

const User: FC<IProps> = React.memo(({data}) => {

  return (
    <tr>
      <td>{data.name}</td>
      <td>{data.surname}</td>
      <td>{data.email}</td>
    </tr>
  );
});

export default User;