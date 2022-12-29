import type { NextApiHandler } from "next";
import { saveData } from "@carrito-compra/share/client/memory-client";

export const saveProductHandler: NextApiHandler = (req, res) => {
  if (req.method !== "POST") {
    res.status(500).end();
    return;
  }

  const product = JSON.parse(req.body);
  saveData(product);
  res.status(200).end();
};
