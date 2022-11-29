import { FunctionComponent, useState } from "react";
import { saveProduct } from "./service/product-service";
import { Product } from "./model/Product";
import { useForm, useFormState } from "react-hook-form";
import styles from "./SaveProduct.module.scss";

export const SaveProduct: FunctionComponent = () => {
  const [isSavedOk, setIsSavedOk] = useState<boolean | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Product>({ mode: "onChange" });

  const { touchedFields, isValid } = useFormState({
    control,
  });

  const onSubmit = async (data: Product) => {
    try {
      await saveProduct(data);
      setIsSavedOk(true);
    } catch (err) {
      setIsSavedOk(false);
    }
  };

  return (
    <main id={styles["save-product"]}>
      <h1>Formulario para guardar producto</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className={styles["name-input"]}>
          <label htmlFor="name">Nombre:</label>
          <input
            id="name"
            maxLength={50}
            {...register("name", { required: true })}
          />
        </section>
        <section className={styles["decription-input"]}>
          <label htmlFor="description">Descripcion:</label>
          <input
            id="description"
            maxLength={200}
            {...register("description", { required: true })}
          />
        </section>
        <section className={styles["image-input"]}>
          <label htmlFor="image">Imagen:</label>
          <input
            id="image"
            {...register("image", {
              required: true,
              pattern:
                /^(www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/gi,
            })}
          />
          {errors.image && touchedFields.image && (
            <span className={styles["error-msg"]}>url invalida</span>
          )}
        </section>
        <section className={styles["price-input"]}>
          <label htmlFor="price">Precio:</label>
          <input
            id="price"
            type={"number"}
            {...register("price", {
              required: true,
              valueAsNumber: true,
              min: 1,
            })}
          />
          {errors.price && touchedFields.price && (
            <span className={styles["error-msg"]}>
              oye ql, ingresa numeros positivos
            </span>
          )}
        </section>

        <button type="submit" disabled={!isValid}>
          Guardar
        </button>
      </form>
      {isSavedOk && <p>Felicitaciones!. Producto guardado</p>}
      {isSavedOk === false && <p>Error guardando datos</p>}
    </main>
  );
};
