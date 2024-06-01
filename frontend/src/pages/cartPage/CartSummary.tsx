import classes from "./cartSummary.module.css";

const CartSummary = ({
  cartItems,
  onCheckout,
}: {
  cartItems: CartItem[];
  onCheckout: () => void;
}) => {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  const shipping =
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) > 100
      ? 0
      : 10;
  return (
    <div className={classes.cart__bill}>
      <h3>Subtotal: ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h3>
      <div className={classes["cart__bill-row"]}>
        <span>Subtotal</span>
        <span>Q {subtotal.toFixed(2)}</span>
      </div>
      <div className={classes["cart__bill-row"]}>
        <span>Envío</span>
        <span>Q {shipping.toFixed(2)}</span>
      </div>
      <div className={classes["cart__bill-row"]}>
        <span>Total</span>
        <span>Q {(subtotal + shipping).toFixed(2)}</span>
      </div>
      <button
        className="btn"
        disabled={cartItems.length === 0}
        onClick={onCheckout}
      >
        Proceder a Pagar
      </button>
    </div>
  );
};

export default CartSummary;
