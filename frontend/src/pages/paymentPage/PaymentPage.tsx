import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";
import classes from "./paymentPage.module.css";

const PaymentPage = () => {
  return (
    <section className={classes.payment}>
      <div className={classes.payment__container}>
        <CheckoutSteps step1 step2 />
      </div>
    </section>
  );
};

export default PaymentPage;
