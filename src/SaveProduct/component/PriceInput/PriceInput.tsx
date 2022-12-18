import { FunctionComponent } from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { Input } from "../Input";

const NUMERIC_PATTERN = /^\d+$/;

export const PriceInput: FunctionComponent = () => {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const { touchedFields } = useFormState({
    control,
  });

  return (
    <Input
      id="price"
      label="Precio:"
      registerOptions={{
        required: true,
        pattern: NUMERIC_PATTERN,
      }}
      errorValidationMsg={
        errors.price && touchedFields.price
          ? "oye ql, ingresa numeros positivos"
          : undefined
      }
      inputMode="numeric"
    />
  );
};
