import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";
import classes from "./placerOrder.module.css";
import { useCreateOrderMutation } from "../../store/slices/ordersApiSlice";
import { toast } from "react-toastify";
import { clearCartItems } from "../../store/slices/cartSlice";
import Summary from "../../components/summary/Summary";
import ProductsList from "../../components/productsList/ProductsList";

const PlaceOrder = () => {
  const cart = useSelector((state: { cart: CartState }) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      !cart.shippingAddress.address ||
      !cart.shippingAddress.department ||
      !cart.shippingAddress.municipality ||
      !cart.shippingAddress.department
    ) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  useEffect(() => {
    const body = document.querySelector("body") as HTMLElement;
    body.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: [
          ...cart.cartItems.map((item) => ({
            name: item.name,
            qty: item.qty,
            image: item.image,
            price: item.price,
            product: item._id,
          })),
        ],
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error("Error al realizar el pedido");
    }
  };

  return (
    <section className={classes.placerOrder}>
      <CheckoutSteps step1 step2 step3 />
      <div className={classes.placerOrder__container}>
        <div className={classes.info}>
          <div className={classes.shipping}>
            <h3>Dirección de envío</h3>
            <p>
              <strong>Dirección:</strong> {cart.shippingAddress.address},{" "}
              {cart.shippingAddress.municipality},{" "}
              {cart.shippingAddress.department}, {cart.shippingAddress.zipcode}
            </p>
          </div>
          <div className={classes.payment}>
            <h3>Método de pago</h3>
            <p>
              <strong>Método de pago: </strong>
              {cart.paymentMethod}
            </p>
          </div>
          <ProductsList orderItems={cart.cartItems} />
        </div>
        <Summary
          itemsPrice={cart.itemsPrice}
          shippingPrice={cart.shippingPrice}
          taxPrice={cart.taxPrice}
          totalPrice={cart.totalPrice}
          isLoading={isLoading}
          onSubmit={placeOrderHandler}
        />
      </div>
    </section>
  );
};

export default PlaceOrder;
