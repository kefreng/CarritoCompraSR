import { Product } from "@carrito-compra/SaveProduct/model/Product";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent, useEffect, useState } from "react";
import { formatPrice, getProductList } from "./home.services";

export const Home: FunctionComponent = () => {
  const [productList, setProductList] = useState<Product[]>([]);

  const loadProduct = async () => {
    const responseProductList = await getProductList();
    setProductList(responseProductList);
  };
  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <main>
      <nav>
        <Link href="/guardar-producto">
          <a>Guardar producto</a>
        </Link>
      </nav>
      <article>
        {productList.map((productItem, index) => (
          <section key={`${productItem.name}-${index}`}>
            <h1>{productItem.name}</h1>
            <p>{productItem.description}</p>
            <Image
              src={`https://${productItem.image}`}
              alt={`Imagen de un producto ${productItem.name}`}
              layout="fixed"
              width={100}
              height={100}
            />
            <span>{formatPrice(productItem.price)}</span>
          </section>
        ))}
      </article>
    </main>
  );
};
