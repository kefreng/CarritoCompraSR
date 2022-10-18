import { render, screen } from "@testing-library/react";
import { Home } from "./Home";

describe("Home", () => {
  test("should have save product button", () => {
    render(<Home />);
    expect(screen.getByText(/guardar producto/i)).toBeVisible();
  });
});
