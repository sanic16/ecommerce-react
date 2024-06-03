import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import classes from "./shippingPage.module.css";
import { toast } from "react-toastify";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";
import Meta from "../../components/meta/Meta";

const ShippingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress, cartItems } = useSelector(
    (state: { cart: CartState }) => state.cart
  );

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const [address, setAddress] = useState<ShippingAddress>(
    shippingAddress.address
      ? shippingAddress
      : { address: "", municipality: "", department: "", zipcode: "" }
  );

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !address.address ||
      !address.municipality ||
      !address.department ||
      !address.zipcode
    ) {
      toast.error("Por favor llene todos los campos");
      return;
    }
    dispatch(saveShippingAddress(address));
    navigate("/payment");
  };

  return (
    <section className={classes.shipping}>
      <Meta title="Coral y Mar | Envío" />
      <CheckoutSteps step1 />
      <div className={classes.shipping__container}>
        <div className={classes.form__container}>
          <h2 className={classes.heading__page}>Envío</h2>
          <form className={classes.form} onSubmit={submitHandler}>
            <input
              type="text"
              name="address"
              placeholder="Dirección de envío"
              required
              value={address.address}
              onChange={changeInputHandler}
              autoFocus
            />
            <input
              type="text"
              name="municipality"
              placeholder="Municipio"
              value={address.municipality}
              onChange={changeInputHandler}
              required
            />
            <input
              type="text"
              name="department"
              placeholder="Departamento"
              value={address.department}
              onChange={changeInputHandler}
              required
            />
            <input
              type="text"
              name="zipcode"
              placeholder="Código postal"
              value={address.zipcode}
              onChange={changeInputHandler}
              required
            />
            <button type="submit" className="btn btn-primary">
              Continuar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ShippingPage;
