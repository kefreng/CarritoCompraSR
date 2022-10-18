import { render, screen } from "@testing-library/react";
import { SaveProduct } from "./SaveProduct";

describe("Home", () => {
  test("should exists", () => {
    render(<SaveProduct />);
    expect(screen.getByText(/formulario para guardar producto/i)).toBeVisible();
  });
});
