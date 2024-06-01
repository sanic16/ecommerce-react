import { useNavigate } from "react-router-dom";
import classes from "./checkoutSteps.module.css";

const CheckoutSteps = ({
  step1,
  step2,
  step3,
}: {
  step1: boolean;
  step2?: boolean;
  step3?: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <div className={classes.checkout__steps}>
      <button
        className={`${step1 && classes.active}`}
        onClick={() => step1 && navigate("/shipping")}
      >
        Envío
      </button>
      <button
        className={`${step2 && classes.active}`}
        onClick={() => step2 && navigate("/payment")}
      >
        Pago
      </button>
      <button
        className={`${step3 && classes.active}`}
        onClick={() => step3 && navigate("/placeorder")}
      >
        Ordenar
      </button>
    </div>
  );
};

export default CheckoutSteps;
