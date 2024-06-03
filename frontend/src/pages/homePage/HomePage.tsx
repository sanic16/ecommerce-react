import { useGetProductsQuery } from "../../store/slices/productApiSlice";
import Product from "../../components/product/Product";
import classes from "./homePage.module.css";
import Meta from "../../components/meta/Meta";
const HomePage = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <section>
      <Meta
        title="Coral y Mar | Inicio"
        description="Productos de la mejor calidad"
        keywords="acuarios, peces, alimentos, corales, insumos"
      />
      <h2 className={classes.heading__page}>Últimos productos</h2>
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
