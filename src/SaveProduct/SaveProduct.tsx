import {
  ChangeEventHandler,
  FormEventHandler,
  FunctionComponent,
  useState,
} from "react";
import { saveProduct } from "./client/product-client";

export const SaveProduct: FunctionComponent = () => {
  const [saveProductFlag, setSaveProductFlag] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    saveProduct({ name, description, image, price });

    setSaveProductFlag(true);
  };

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value },
  }) => setName(value);

  const handleDescriptionChange: ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value },
  }) => setDescription(value);

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value },
  }) => setImage(value);

  const handlePriceChange: ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value },
  }) => setPrice(Number(value));

  return (
    <main>
      <h1>Formulario para guardar producto</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre:</label>
        <input id="name" value={name} onChange={handleNameChange} />
        <label htmlFor="description">Descripcion:</label>
        <input
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <label htmlFor="image">Imagen:</label>
        <input id="image" value={image} onChange={handleImageChange} />
        <label htmlFor="price">Precio:</label>
        <input id="price" value={price} onChange={handlePriceChange} />

        <button type="submit">Guardar</button>
      </form>
      {saveProductFlag && <p>Felicitaciones!. Producto guardado</p>}
    </main>
  );
};
