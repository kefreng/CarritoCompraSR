import { render, screen } from "@testing-library/react";
import { SaveProduct } from "./SaveProduct";
import userEvent from "@testing-library/user-event";

describe("Home", () => {
  test("should exists", () => {
    render(<SaveProduct />);
    expect(screen.getByText(/formulario para guardar producto/i)).toBeVisible();
  });

  test("should save product information", async () => {
    const fetchSpy = jest.fn();
    global.fetch = fetchSpy;
    const user = userEvent.setup();

    render(<SaveProduct />);

    const nameInput = screen.getByLabelText(/nombre:/i);
    await user.type(nameInput, "lata de merluzo");

    const descInput = screen.getByLabelText(/descripcion:/i);
    await user.type(descInput, "descripcion");

    const imageInput = screen.getByLabelText(/imagen:/i);
    await user.type(
      imageInput,
      "www.lider.cl/catalogo/images/whiteLineIcon.svg"
    );

    const priceInput = screen.getByLabelText(/precio:/i);
    await user.type(priceInput, "1111");

    const saveButton = screen.getByText(/^guardar$/i);
    await user.click(saveButton);

    expect(
      await screen.findByText(/Felicitaciones!. Producto guardado/i)
    ).toBeVisible();

    expect(fetchSpy).toHaveBeenCalledWith("/api/save-product", {
      body: '{"name":"lata de merluzo","description":"descripcion","image":"www.lider.cl/catalogo/images/whiteLineIcon.svg","price":1111}',
      method: "POST",
    });
  });
});
