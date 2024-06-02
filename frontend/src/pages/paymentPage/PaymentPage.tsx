import { useEffect, useState } from "react";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";
import classes from "./paymentPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../../store/slices/cartSlice";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    shippingAddress,
    paymentMethod: payment,
    cartItems,
  } = useSelector((state: { cart: CartState }) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(payment);

  useEffect(() => {
    if (
      !shippingAddress.address ||
      !shippingAddress.department ||
      !shippingAddress.municipality ||
      !shippingAddress.zipcode
    ) {
      navigate("/shipping");
    } else if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [shippingAddress, cartItems, navigate]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <section className={classes.payment}>
      <CheckoutSteps step1 step2 />
      <div className={classes.payment__container}>
        <div className={classes.form__container}>
          <h2 className={classes.heading__page}>Método de pago</h2>
          <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.form__group}>
              <label htmlFor="paypal">PayPal o Tarjeta de crédito</label>
              <div>
                <input
                  id="paypal"
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "PayPal"}
                  onChange={() => setPaymentMethod("PayPal")}
                />
              </div>
            </div>
            <div className={classes.form__group}>
              <label htmlFor="banrural">Banco Banrural</label>
              <div>
                <input
                  id="banrural"
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "Banrural"}
                  onChange={() => setPaymentMethod("Banrural")}
                />
              </div>
            </div>
            <div className={classes.form__group}>
              <label htmlFor="gt">Banco G&T</label>
              <div>
                <input
                  id="gt"
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "G&T"}
                  onChange={() => setPaymentMethod("G&T")}
                />
              </div>
            </div>
            <div className={classes.form__group}>
              <label htmlFor="paypal">Banco Industrial</label>
              <div>
                <input
                  id="bi"
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "BI"}
                  onChange={() => setPaymentMethod("BI")}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Continuar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;
