import { RequestHandler } from "express";
import ProductModal from "../../Modals/Product";
import UploadImages from "../../AWS/UploadImages";
import { Logger } from "../../Utils/Logger";

const NewProduct: RequestHandler = async (req, res, next) => {
  try {
    const images = req.files;
    const category = req.body.category;
    const title = req.body.title;
    const subcategory = req.body.subcategory;
    const specificationsString = req.body.specifications;

    const imageUrls = await UploadImages(
      images as Express.Multer.File[],
      category,
      title,
      subcategory
    );

    const specifications = await JSON.parse(specificationsString);

    const specificationAdded = { ...req.body, specifications: specifications };

    const product = { ...specificationAdded, images: imageUrls };

    const result = await ProductModal.create(product);

    Logger.info(
      "New product " + title + " with id: " + result._id + " is added to db"
    );

    res.status(201).json(title + " successfully added");
  } catch (error) {
    Logger.error(error);
    res.status(500);
  }
};

export default NewProduct;
