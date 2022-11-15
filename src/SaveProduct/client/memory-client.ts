import { Product } from "../model/Product";

const products: Product[] = [];

export const saveData = (product: Product) => {
  products.push(product);
};
