import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { FaCity, FaEnvelope, FaMapMarkedAlt } from "react-icons/fa";
import { GiGuatemala } from "react-icons/gi";
import classes from "./shippingPage.module.css";
import { toast } from "react-toastify";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";

const ShippingPage = () => {
  return (
    <section className={classes.shipping}>
      <CheckoutSteps step1 />
      <div className={classes.shipping__container}>
        <div>
          <h2>Envío</h2>
          <form className={classes.form}>
            <input
              type="text"
              name="address"
              placeholder="Dirección de envío"
              required
              autoFocus
            />
            <input
              type="text"
              name="municipality"
              placeholder="Municipio"
              required
            />
            <input
              type="text"
              name="department"
              placeholder="Departamento"
              required
            />
            <input
              type="text"
              name="zipcode"
              placeholder="Código postal"
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
