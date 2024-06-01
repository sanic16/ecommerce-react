import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa6";
import classes from "./cartItem.module.css";

const CartItem = ({
  item,
  onRemoveItem,
  onAddToCart,
}: {
  item: CartItem;
  onRemoveItem: (id: string) => void;
  onAddToCart: (item: CartItem, qty: number) => void;
}) => {
  return (
    <div key={item._id} className={classes.cart__item}>
      <div className={classes["cart__item-image"]}>
        <img src={item.image} alt={item.name} />
      </div>
      <div className={classes["cart__item-info"]}>
        <h5>
          <Link to={`/product/${item._id}`}>{item.name}</Link>
        </h5>
        <div className={classes["cart__item-qty"]}>
          <p>Precio: ${item.price}</p>
          <div className={classes.selector}>
            <p>Cantidad: </p>
            <select
              value={item.qty}
              className={classes.qty}
              onChange={(e) => onAddToCart(item, Number(e.target.value))}
            >
              {[
                ...Array(item.countInStock > 6 ? 6 : item.countInStock).keys(),
              ].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>
          <button className="btn" onClick={() => onRemoveItem(item._id)}>
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
