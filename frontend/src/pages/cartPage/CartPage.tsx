import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../store/slices/cartSlice";

import classes from "./cartPage.module.css";
import Message from "../../components/message/Message";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state: { cart: CartState }) => state.cart);

  const addToCartHandler = (item: CartItem, qty: number) => {
    dispatch(addToCart({ ...item, qty }));
  };

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };
  return (
    <section className={classes.cart} id="cart">
      <div className={classes.cart__container}>
        <h2 className={classes.heading__page}>Carrito de compras</h2>
        {cartItems.length === 0 ? (
          <>
            <Message text="Tu carrito está vació" variant="danger" />
            <Link to="/" className="btn">
              Volver
            </Link>
          </>
        ) : (
          <div className={classes.cart__summary}>
            <div className={classes.cart__info}>
              {cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onAddToCart={addToCartHandler}
                  onRemoveItem={removeFromCartHandler}
                />
              ))}
            </div>
            <CartSummary cartItems={cartItems} onCheckout={checkoutHandler} />
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
