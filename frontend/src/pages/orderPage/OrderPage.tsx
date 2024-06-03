import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";
import { useGetOrderDetailsQuery } from "../../store/slices/ordersApiSlice";

import classes from "./orderPage.module.css";
import Summary from "../../components/summary/Summary";
import ProductsList from "../../components/productsList/ProductsList";
import Heading from "../../components/heading/Heading";
import { useEffect } from "react";

const OrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, isError } = useGetOrderDetailsQuery(id!);

  useEffect(() => {
    const body = document.querySelector("body") as HTMLElement;
    body.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  return (
    <section>
      {isLoading ? (
        <Loader />
      ) : isError || !order ? (
        <Message variant="danger" text="Error al cargar la orden" />
      ) : (
        <>
          <Heading>Orden {order._id}</Heading>

          <div className={classes.order__container}>
            <div className={classes.info}>
              <div className={classes.shipping}>
                <h3>Dirección de envío</h3>
                <p>
                  <strong>Nombre:</strong> {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong> {order.user.email}
                </p>
                <p>
                  <strong>Dirección:</strong> {order.shippingAddress.address},{" "}
                  {order.shippingAddress.municipality},{" "}
                  {order.shippingAddress.department},{" "}
                  {order.shippingAddress.zipcode}
                </p>
                {order.isDelivered ? (
                  <Message
                    variant="success"
                    text={`Entregado el ${order.deliveredAt}`}
                  />
                ) : (
                  <Message variant="danger" text="No entregado" />
                )}
              </div>
              <div className={classes.payment}>
                <h3>Método de pago</h3>
                <p>
                  <strong>Método de pago: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant="success" text="Pagado" />
                ) : (
                  <Message variant="danger" text="No pagado" />
                )}
              </div>
              <ProductsList orderItems={order.orderItems} />
            </div>

            <Summary
              itemsPrice={order.itemsPrice}
              shippingPrice={order.shippingPrice}
              taxPrice={order.taxPrice}
              totalPrice={order.totalPrice}
              isLoading={isLoading}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default OrderPage;
