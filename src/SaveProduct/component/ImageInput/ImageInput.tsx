import { FunctionComponent } from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { Input } from "@carrito-compra/SaveProduct/component/Input";

const IMAGE_REGEX_VALIDATION =
  /^(www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/gi;

export const ImageInput: FunctionComponent = () => {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const { touchedFields } = useFormState({
    control,
  });

  return (
    <Input
      id="image"
      label="Imagen:"
      registerOptions={{
        required: true,
        pattern: IMAGE_REGEX_VALIDATION,
      }}
      errorValidationMsg={
        errors.image && touchedFields.image ? "url invalida" : undefined
      }
    />
  );
};
