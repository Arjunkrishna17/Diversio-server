import { RequestHandler } from "express";
import User from "../../Modals/User";
import TokenGen from "./TokenGen";
import { user } from "./Type";
import { Logger } from "../../Utils/Logger";

const LoginController: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const userDetails: user | null = await User.findOne({
      username: username,
    });

    if (!userDetails || password !== userDetails.password) {
      return res
        .status(401)
        .json("Incorrect Username or Password.");
    }

    const token = TokenGen(userDetails);

    res.status(200).json(token);
  } catch (error) {
    Logger.error(error);
    res.status(404).json("Something went wrong, please try again later.");
  }
};

export default LoginController;
