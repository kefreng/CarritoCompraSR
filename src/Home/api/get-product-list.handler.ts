import { getData } from "@carrito-compra/share/client/memory-client";
import type { NextApiHandler } from "next";

export const getProductListHandler: NextApiHandler = (req, res) => {
  if (req.method !== "GET") {
    res.status(500).end();
    return;
  }

  const productList = getData();
  res.json(productList);
};
