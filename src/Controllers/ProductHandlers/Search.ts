import { RequestHandler } from "express";

import ProductModal from "../../Modals/Product";
import { ERROR_MSG } from "../../Config/Constants";
import { Logger } from "../../Utils/Logger";

const Search: RequestHandler = async (req, res, next) => {
  const search = req.query.search;

  try {
    const response = await ProductModal.find(
      {
        title: { $regex: search, $options: "i" },
      },
      "title"
    )
      .sort("title")
      .limit(50);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(ERROR_MSG + " error: " + error);

    Logger.error("Failed to get product search results error: " + error);
  }
};

export default Search;
