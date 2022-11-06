import { Product } from "@carrito-compra/SaveProduct/model/Product";

export const saveProduct = async (product: Product) => {
  const result = await fetch("/api/save-product", {
    method: "POST",
    body: JSON.stringify(product),
  });

  if (!result.ok) {
    throw new Error("fail calling api");
  }
};
