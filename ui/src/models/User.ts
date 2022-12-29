interface IUser {
  id: number;
  email: string;
  password: string;
  isactivated: boolean;
  name: string;
  surname: string;
}

export {
  type IUser,
}