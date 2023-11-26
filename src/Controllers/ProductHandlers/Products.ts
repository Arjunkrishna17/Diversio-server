import { RequestHandler } from "express";
import ProductModal from "../../Modals/Product";
import { Logger } from "../../Utils/Logger";
import PaginationHandler from "../../Utils/PaginationHandler";

const Products: RequestHandler = async (req, res, next) => {
  try {
    const productId = req.query["product-id"];
    const categoryFilter = req.query.category;
    const search = req.query.search as string;
    const pageNumber = req.query.page || 0;
    const pageSize = req.query.size || 50;

    let products;

    if (productId) {
      products = await ProductModal.findById(productId);
    } else {
      let query = { $match: {} };
      let sort = { $sort: { title: 1 } } as { $sort: Record<string, 1 | -1> };

      if (categoryFilter) {
        query.$match = { category: categoryFilter };
      }
      if (search) {
        const replaceSpclCharacter = search.replace(
          /[-\/\\^$*+?.()|[\]{}]/g,
          "\\$&"
        );

        query.$match = {
          ...query.$match,
          title: { $regex: replaceSpclCharacter, $options: "i" },
        };
      }

      products = await PaginationHandler(
        +pageNumber,
        +pageSize,
        [query, sort],
        ProductModal
      );
    }

    res.status(200).json(products);
  } catch (error) {
    Logger.error("Failed to fetch products: " + error);
    res.status(404).json("Failed to get products, please try again later.");
  }
};

export default Products;
