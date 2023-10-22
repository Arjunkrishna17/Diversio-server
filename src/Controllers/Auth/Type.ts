import { ObjectId } from "mongodb";

export interface user {
  _id: ObjectId;
  username: string;
  password: string;
  user: string;
  mobileNumber: string;
}
