import { IUser } from "../User";

export interface AuthResponse {
  accesstoken: string;
  refreshtoken: string;
  user: IUser;
}