import { user } from "./../Controllers/Auth/Type";
import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  user: { type: String, required: true },
  mobileNumber: { type: String, required: true },
});

const User = model("User", userSchema);

export default User;
