import { FunctionComponent, useState } from "react";
import { saveProduct } from "./service/product-service";
import { Product } from "./model/Product";
import { FormProvider, useForm } from "react-hook-form";
import styles from "./SaveProduct.module.scss";
import { NameInput } from "./component/NameInput";
import { DescriptionInput } from "./component/DescriptionInput";
import { ImageInput } from "./component/ImageInput/ImageInput";
import { PriceInput } from "./component/PriceInput";
import { SaveButton } from "./component/SaveButton";

export const SaveProduct: FunctionComponent = () => {
  const [isSavedOk, setIsSavedOk] = useState<boolean | undefined>();

  const formMethods = useForm<Product>({ mode: "onChange" });
  const { handleSubmit } = formMethods;

  const onSubmit = async (data: Product) => {
    try {
      await saveProduct({ ...data, price: parseInt(data.price + "") });
      setIsSavedOk(true);
    } catch (err) {
      setIsSavedOk(false);
    }
  };

  return (
    <main id={styles["save-product"]}>
      <h1>Formulario para guardar producto</h1>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["name-input"]}>
            <NameInput />
          </div>
          <div className={styles["decription-input"]}>
            <DescriptionInput />
          </div>
          <div className={styles["image-input"]}>
            <ImageInput />
          </div>
          <div className={styles["price-input"]}>
            <PriceInput />
          </div>

          <div className={styles["save-button"]}>
            <SaveButton />
          </div>
        </form>
      </FormProvider>
      {isSavedOk && <p>Felicitaciones!. Producto guardado</p>}
      {isSavedOk === false && <p>Error guardando datos</p>}
    </main>
  );
};
