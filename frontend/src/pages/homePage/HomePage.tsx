import { useGetProductsQuery } from "../../store/slices/productApiSlice";
import { Link, useParams } from "react-router-dom";
import Product from "../../components/product/Product";
import classes from "./homePage.module.css";
import Meta from "../../components/meta/Meta";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import Pagination from "../../components/pagination/Pagination";
import { useEffect } from "react";
import Heading from "../../components/heading/Heading";
const HomePage = () => {
  const { pageNumber, search } = useParams<{
    pageNumber: string;
    search: string;
  }>();
  const { data, isLoading, isError } = useGetProductsQuery({
    pageNumber: Number(pageNumber) || 1,
    keyword: search || "",
  });

  const up = search && pageNumber;
  useEffect(() => {
    const body = document.querySelector("body") as HTMLElement;
    body.scrollIntoView({
      behavior: "smooth",
    });
  }, [search, up]);
  const path = search ? `search/${search}/page` : `page`;

  return (
    <section id="home">
      <Meta
        title="Coral y Mar | Inicio"
        description="Productos de la mejor calidad"
        keywords="acuarios, peces, alimentos, corales, insumos"
      />
      {!search ? (
        <ProductCarousel />
      ) : (
        <Link
          to="/"
          className="btn btn-primary"
          style={{ marginBottom: "2rem" }}
        >
          Regresar
        </Link>
      )}
      {isLoading ? (
        <h1>Cargando...</h1>
      ) : isError || !data || data.products.length === 0 ? (
        <Heading>No hay resultados</Heading>
      ) : (
        <div>
          <div className={classes.products}>
            {data?.products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          <Pagination page={data.page} pages={data.pages} path={path} />
        </div>
      )}
    </section>
  );
};

export default HomePage;
