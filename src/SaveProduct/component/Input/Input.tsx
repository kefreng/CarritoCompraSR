import { FunctionComponent, HTMLAttributes } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import styles from "./Input.module.scss";

type InputProps = {
  id: string;
  label: string;
  registerOptions: RegisterOptions;
  errorValidationMsg?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLenght?: number;
};

export const Input: FunctionComponent<InputProps> = ({
  id,
  label,
  registerOptions,
  errorValidationMsg,
  inputMode,
  maxLenght,
}) => {
  const { register } = useFormContext();

  return (
    <section className={styles["input"]}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        maxLength={maxLenght}
        {...register(id, registerOptions)}
        inputMode={inputMode}
      />
      {errorValidationMsg && <span>{errorValidationMsg}</span>}
    </section>
  );
};
