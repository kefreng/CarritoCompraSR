import { Product } from "@carrito-compra/SaveProduct/model/Product";
import { get } from "@carrito-compra/share/client/http-client";

const LOCALES = "es-CL";
const STYLE = "currency";
const CURRENCY = "CLP";
const URL_GET_PRODUCT_LIST = "/api/get-product-list";

export const formatPrice = (price: number) => {
  const formater = new Intl.NumberFormat(LOCALES, {
    style: STYLE,
    currency: CURRENCY,
  });

  return formater.format(price);
};

export const getProductList = async () => {
  return await get<Product[]>(URL_GET_PRODUCT_LIST);
};
