import { Link } from "react-router-dom";
import classes from "./productsList.module.css";

const ProductsList = ({
  orderItems,
}: {
  orderItems: {
    _id: string;
    image: string;
    name: string;
    qty: number;
    price: number;
  }[];
}) => {
  return (
    <div className={classes.items}>
      <h3>Lista de productos</h3>
      <div className={classes.products}>
        {orderItems.map((item) => (
          <div key={item._id} className={classes.product}>
            <div className={classes.img}>
              <img src={item.image} alt={item.name} />
            </div>
            <div className={classes.product__info}>
              <div>
                <Link to={`/product/${item._id}`}>{item.name}</Link>
              </div>
              <div>
                {item.qty} x Q{item.price} = Q
                {(item.qty * item.price).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
