import { RequestHandler, response } from "express";
import AddressModal from "../Modals/Address";
import { Logger } from "../Utils/Logger";

export const saveAddress: RequestHandler = async (req, res, next) => {
  try {
    const address = req.body;

    const userId = res.locals.userId;

    //Make default flag as false for other address
    if (address.default) {
      await AddressModal.updateMany(
        { _id: userId },
        {
          $set: { default: false },
        }
      );

      Logger.info("All other addresses are updated to non default");
    }

    await AddressModal.create(req.body);

    res.status(200).json("Address successfully Added");

    Logger.info("New address added for the user:" + userId);
  } catch (error) {
    Logger.info("Failed to add address: " + error);
    res.status(500).json(error);
  }
};

export const getAddress: RequestHandler = async (req, res, next) => {
  try {
    const userId = res.locals.userId;

    const addresses = await AddressModal.findOne(userId);

    res.status(200).json(addresses);
  } catch (error) {
    Logger.info("Failed to get address: " + error);
    4;
    res.status(500).json(error);
  }
};
