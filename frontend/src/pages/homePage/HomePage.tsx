import { useGetProductsQuery } from "../../store/slices/productApiSlice";
import { useParams } from "react-router-dom";
import Product from "../../components/product/Product";
import classes from "./homePage.module.css";
import Meta from "../../components/meta/Meta";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import Pagination from "../../components/pagination/Pagination";
import { useEffect } from "react";
const HomePage = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>();
  console.log("pageNumber", pageNumber);
  const { data, isLoading, isError } = useGetProductsQuery({
    pageNumber: Number(pageNumber) || 1,
  });

  useEffect(() => {
    const body = document.querySelector("body") as HTMLElement;
    body.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  return (
    <section>
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
          <Pagination page={data.page} pages={data.pages} />
        </div>
      )}
    </section>
  );
};

export default HomePage;
