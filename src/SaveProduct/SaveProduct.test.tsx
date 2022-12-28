import { render, screen, waitFor } from "@testing-library/react";
import { SaveProduct } from "./SaveProduct";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";

describe("Home", () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
  });

  test("should exists", () => {
    render(<SaveProduct />);
    expect(screen.getByText(/formulario para guardar producto/i)).toBeVisible();
  });

  test("should save product information", async () => {
    const fetchSpy = jest.fn().mockResolvedValue({
      ok: true,
    });
    global.fetch = fetchSpy;

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
    user.click(saveButton);

    await waitFor(() => {
      expect(priceInput).toHaveValue("");

      expect(fetchSpy).toHaveBeenCalledWith("/api/save-product", {
        body: '{"name":"lata de merluzo","description":"descripcion","image":"www.lider.cl/catalogo/images/whiteLineIcon.svg","price":1111}',
        method: "POST",
      });

      expect(
        screen.getByText(/Felicitaciones!. Producto guardado/i)
      ).toBeVisible();
    });
  });

  test("Should not allow product's name bigger than 50 chr", async () => {
    render(<SaveProduct />);

    const nameInput = screen.getByLabelText(/nombre:/i);
    await user.type(nameInput, "a".repeat(50));
    await user.type(nameInput, "b");

    expect(nameInput).toHaveValue("a".repeat(50));
  });

  test("Should not allow product's description bigger than 200 chr", async () => {
    render(<SaveProduct />);

    const descInput = screen.getByLabelText(/descripcion:/i);
    await user.type(descInput, "a".repeat(200));
    await user.type(descInput, "b");

    expect(descInput).toHaveValue("a".repeat(200));
  });

  test("Should not allow product's url different to url", async () => {
    render(<SaveProduct />);

    const imageInput = screen.getByLabelText(/imagen:/i);
    await user.type(imageInput, "lider.cl/catalogo/images/whiteLineIcon.svg");
    await user.tab();

    expect(screen.getByText(/^url invalida$/i)).toBeVisible();
  });

  test("Should not allow type characters different to numbers in product's price", async () => {
    render(<SaveProduct />);

    const priceInput = screen.getByLabelText(/precio:/i);
    await user.type(priceInput, "123456");
    await user.type(priceInput, "abc");
    await user.tab();

    expect(
      await screen.findByText(/oye ql, ingresa numeros positivos/i)
    ).toBeVisible();
  });

  test("Should not allow type negatives numbers in product's price", async () => {
    render(<SaveProduct />);

    const priceInput = screen.getByLabelText(/precio:/i);
    await user.type(priceInput, "-1");
    await user.tab();

    expect(
      screen.getByText(/^oye ql, ingresa numeros positivos$/i)
    ).toBeVisible();
  });

  test("should have submit button disabled when a field is wrong", async () => {
    const fetchSpy = jest.fn();
    global.fetch = fetchSpy;

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
    await user.type(priceInput, "-1111");

    expect(screen.getByText(/^guardar$/i)).toBeDisabled();
  });

  test("should show error when occurs error on saving data product", async () => {
    const fetchSpy = jest.fn().mockResolvedValue({
      ok: false,
    });
    global.fetch = fetchSpy;

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

    expect(await screen.findByText(/Error guardando datos/i)).toBeVisible();
  });
});
