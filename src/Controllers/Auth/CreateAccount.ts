import { RequestHandler, response } from "express";
import User from "../../Modals/User";
import TokenGen from "./TokenGen";
import { Logger } from "../../Utils/Logger";
import { user } from "./Type";

const CreateAccount: RequestHandler = async (req, res, next) => {
  try {
    const userInfo: user = req.body;

    const userExist = await User.findOne({ username: userInfo.username });

    if (userExist) {
      res.status(409).json("User already exists");
      return;
    }

    const userCreated: user = await User.create(userInfo);

    const token = TokenGen(userCreated);

    res.status(200).json(token);
  } catch (error) {
    Logger.error("Failed to create an account " + error);
    res.status(500).json("Failed to create an account, please try again later");
  }
};

export default CreateAccount;
