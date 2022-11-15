import { Product } from "@carrito-compra/SaveProduct/model/Product";

export const post = async (url: string, product: Product) => {
  const result = await fetch(url, {
    method: "POST",
    body: JSON.stringify(product),
  });

  if (!result.ok) {
    throw new Error("fail calling api");
  }
};
