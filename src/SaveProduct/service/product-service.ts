import { Product } from "@carrito-compra/SaveProduct/model/Product";
import { post } from "@carrito-compra/SaveProduct/client/product-client";

export const saveProduct = async (product: Product) => {
  const url = "/api/save-product";

  await post(url, product);
};
