import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSteps";
import classes from "./placerOrder.module.css";
import { useCreateOrderMutation } from "../../store/slices/ordersApiSlice";
import { toast } from "react-toastify";
import { clearCartItems } from "../../store/slices/cartSlice";

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
    // if (cart.cartItems.length === 0) {
    //   navigate("/cart");
    // }
  }, [cart, navigate]);

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
          <div className={classes.items}>
            <h3>Lista de productos</h3>
            <div className={classes.products}>
              {cart.cartItems.map((item) => (
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
        </div>
        <div className={classes.summary}>
          <h3>Resumen de la orden</h3>
          <div>
            <div>
              <strong>Productos</strong>
              <span>Q{cart.itemsPrice.toFixed(2)}</span>
            </div>
          </div>
          <div>
            <div>
              <strong>Envío</strong>
              <span>Q{cart.shippingPrice.toFixed(2)}</span>
            </div>
          </div>
          <div>
            <div>
              <strong>Impuestos</strong>
              <span>Q{cart.taxPrice.toFixed(2)}</span>
            </div>
          </div>
          <div>
            <div>
              <strong>Total</strong>
              <span>Q{cart.totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <div>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={placeOrderHandler}
              disabled={isLoading}
            >
              {isLoading ? "Procesando..." : "Realizar pedido"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaceOrder;
