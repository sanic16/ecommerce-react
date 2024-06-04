import { useGetProductsQuery } from "../../store/slices/productApiSlice";
import { useParams } from "react-router-dom";
import Product from "../../components/product/Product";
import classes from "./homePage.module.css";
import Meta from "../../components/meta/Meta";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import Pagination from "../../components/pagination/Pagination";
import { useEffect } from "react";
const HomePage = () => {
  const { pageNumber, search } = useParams<{
    pageNumber: string;
    search: string;
  }>();
  const { data, isLoading, isError } = useGetProductsQuery({
    pageNumber: Number(pageNumber) || 1,
    keyword: search || "",
  });

  useEffect(() => {
    const body = document.querySelector("body") as HTMLElement;
    body.scrollIntoView({
      behavior: "smooth",
    });
  }, []);
  const path = search ? `search/${search}/page` : `page`;

  console.log("path", path);
  console.log("search", search);
  return (
    <section id="home">
      <Meta
        title="Coral y Mar | Inicio"
        description="Productos de la mejor calidad"
        keywords="acuarios, peces, alimentos, corales, insumos"
      />
      <ProductCarousel />
      {isLoading ? (
        <p>Cargando...</p>
      ) : isError || !data ? (
        <p>Error al cargar los productos</p>
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
