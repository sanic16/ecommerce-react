import { Link } from "react-router-dom";
import Rating from "../rating/Rating";
import classes from "./product.module.css";

const Product = ({ product }: { product: ProductCard }) => {
  return (
    <div className={classes.product}>
      <div className={classes.product__header}>
        <div className={classes.product__image}>
          <img src={product.image} alt={product.name} />
        </div>
        <Link to={`/product/${product._id}`}>
          <h5>{product.name}</h5>
        </Link>
      </div>
      <div className={classes.product__body}>
        <div className={classes.product__rating}>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>
        <p className={classes.product__price}>Q{product.price.toFixed(2)}</p>
        <Link to={`/product/${product._id}`} className="btn">
          Ver Producto
        </Link>
      </div>
    </div>
  );
};

export default Product;
