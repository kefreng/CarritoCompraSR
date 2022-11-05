import {
  ChangeEventHandler,
  FormEventHandler,
  FunctionComponent,
  useState,
} from "react";
import { saveProduct } from "./client/product-client";
import { Product } from "./model/Product";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";

export const SaveProduct: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<Product>({ mode: "onChange" });

  const { touchedFields, isSubmitSuccessful } = useFormState({ control });

  const onSubmit = (data: Product) => saveProduct(data);

  return (
    <main>
      <h1>Formulario para guardar producto</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Nombre:</label>
        <input id="name" maxLength={50} {...register("name")} />
        <label htmlFor="description">Descripcion:</label>
        <input id="description" maxLength={200} {...register("description")} />
        <label htmlFor="image">Imagen:</label>
        <input
          id="image"
          {...register("image", {
            pattern:
              /^(www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/gi,
          })}
        />
        {errors.image && touchedFields.image && <span>url invalida</span>}
        <label htmlFor="price">Precio:</label>
        <input
          id="price"
          type={"number"}
          {...register("price", {
            valueAsNumber: true,
            min: 1,
          })}
        />
        {errors.price && touchedFields.price && (
          <span>oye ql, ingresa numeros positivos</span>
        )}

        <button type="submit">Guardar</button>
      </form>
      {isSubmitSuccessful && <p>Felicitaciones!. Producto guardado</p>}
    </main>
  );
};
