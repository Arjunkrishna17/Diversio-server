import { Router } from "express";

import LoginController from "../Controllers/Auth/LoginController";
import CreateAccount from "../Controllers/Auth/CreateAccount";

const Login = Router();

Login.post("/login", LoginController);

Login.post("/create-account", CreateAccount);

export default Login;
