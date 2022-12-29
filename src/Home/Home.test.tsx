import { Product } from "@carrito-compra/SaveProduct/model/Product";
import { act, render, screen } from "@testing-library/react";
import { Home } from "./Home";

const DEFAULT_PRODUCT: Product = {
  name: "nombre producto 1",
  description: "descripcion producto 1",
  image: "www.google.cl/image",
  price: 20000,
};

const DEFAULT_PRODUCT_RESPONSE: Partial<Response> = {
  ok: true,
  json: jest.fn().mockResolvedValue([DEFAULT_PRODUCT]),
};

describe("Home", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue(DEFAULT_PRODUCT_RESPONSE);
  });

  test("should have save product button", async () => {
    await act(() => {
      render(<Home />);
    });
    expect(screen.getByText(/guardar producto/i)).toBeVisible();
  });

  test("should show product items", async () => {
    const productList: Product[] = [
      {
        name: "nombre producto 1",
        description: "descripcion producto 1",
        image: "www.google.cl/image",
        price: 20000,
      },
      {
        name: "nombre producto 2",
        description: "descripcion producto 2",
        image: "www.google.cl/image2",
        price: 30000,
      },
      {
        name: "nombre producto 3",
        description: "descripcion producto 3",
        image: "www.google.cl/image3",
        price: 40000,
      },
    ];

    const response: Partial<Response> = {
      ok: true,
      json: jest.fn().mockResolvedValue(productList),
    };

    const fetchSpy = jest.fn().mockResolvedValue(response);
    global.fetch = fetchSpy;

    render(<Home />);
    expect(await screen.findAllByText(/^nombre producto \d$/i)).toHaveLength(3);

    expect(screen.getByText(/^nombre producto 1$/i)).toBeVisible();
    expect(screen.getByText(/^descripcion producto 1$/i)).toBeVisible();
    expect(
      screen.getByAltText(/^Imagen de un producto nombre producto 1$/i)
    ).toBeVisible();
    expect(screen.getByText(/^\$20.000$/i)).toBeVisible();
  });
});
