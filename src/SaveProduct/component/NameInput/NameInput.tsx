import { FunctionComponent } from "react";
import { Input } from "@carrito-compra/SaveProduct/component/Input";

export const NameInput: FunctionComponent = () => {
  return (
    <Input
      id="name"
      label="Nombre:"
      registerOptions={{ required: true }}
      maxLenght={50}
    />
  );
};
