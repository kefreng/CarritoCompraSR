import Link from "next/link";
import { FunctionComponent } from "react";

export const Home: FunctionComponent = () => (
  <main>
    <nav>
      <Link href="/guardar-producto">
        <a>Guardar producto</a>
      </Link>
    </nav>
  </main>
);
