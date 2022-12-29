import { Product } from "../../SaveProduct/model/Product";

const products: Product[] = [];

export const saveData = (product: Product) => {
  products.push(product);
};

export const getData = () => {
  return products;
};
