import { FunctionComponent } from "react";
import { useFormContext, useFormState } from "react-hook-form";
import styles from "./SaveButton.module.scss";

export const SaveButton: FunctionComponent = () => {
  const { control } = useFormContext();
  const { isValid } = useFormState({
    control,
  });

  return (
    <button type="submit" disabled={!isValid} className={styles["save-button"]}>
      Guardar
    </button>
  );
};
