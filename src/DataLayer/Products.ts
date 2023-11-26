import ProductModal from "../Modals/Product";

export const GetProductsWithIdsDL = async (productIds: string[]) => {
  const products = await ProductModal.find({ _id: { $in: productIds } });

  return products;
};
