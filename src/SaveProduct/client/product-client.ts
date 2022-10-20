import { Product } from "@carrito-compra/SaveProduct/model/Product";

export const saveProduct = (product: Product) =>
  fetch("/api/save-product", {
    method: "POST",
    body: JSON.stringify(product),
  });
