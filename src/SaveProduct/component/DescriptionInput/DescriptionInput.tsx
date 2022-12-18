import { FunctionComponent } from "react";
import { Input } from "@carrito-compra/SaveProduct/component/Input";

export const DescriptionInput: FunctionComponent = () => {
  return (
    <Input
      id="description"
      label="Descripcion:"
      registerOptions={{ required: true }}
      maxLenght={200}
    />
  );
};
