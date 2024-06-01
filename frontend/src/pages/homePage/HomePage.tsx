import { useGetProductsQuery } from "../../store/slices/productApiSlice";
import Product from "../../components/product/Product";
import classes from "./homePage.module.css";
const HomePage = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <section>
      <h1>Últimos productos</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : isError || !products ? (
        <p>Error al cargar los productos</p>
      ) : (
        <div className={classes.products}>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default HomePage;
