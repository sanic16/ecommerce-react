import classes from "./profile.module.css";
import Heading from "../../components/heading/Heading";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetMyOrdersQuery } from "../../store/slices/ordersApiSlice";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { userInfo } = useSelector(
    (state: { auth: { userInfo: Auth } }) => state.auth
  );

  const [userData, setUserData] = useState({
    name: userInfo?.name,
    email: userInfo?.email,
    password: "",
    confirmPassword: "",
  });

  const { data: orders, isLoading, isError } = useGetMyOrdersQuery();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className={classes.profile}>
      <Heading>Mi perfil</Heading>
      <div className={classes.profile__container}>
        <div className={classes.profile__info}>
          <h3>Información de usuario</h3>
          <form>
            <div className={classes.profile__formGroup}>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                placeholder="Tu nombre"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
            </div>
            <div className={classes.profile__formGroup}>
              <label htmlFor="email">Correo</label>
              <input
                type="email"
                id="email"
                placeholder="Tu correo"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
            <div className={classes.profile__formGroup}>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Tu contraseña"
                name="password"
                value={userData.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>
            <div className={classes.profile__formGroup}>
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirmar contraseña"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>
            <button className="btn bnt-primary">Actualizar</button>
          </form>
        </div>
        <div className={classes.profile__orders}>
          <h3>Mis ordenes</h3>
          {isLoading ? (
            <Loader />
          ) : isError || !orders ? (
            <Message
              variant="danger"
              text="No se pudieron cargar las ordenes"
            />
          ) : (
            <div className={classes.table__wrapper}>
              <table className={classes.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Pagado</th>
                    <th>Entregado</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>
                        {new Date(order.createdAt).toLocaleDateString("es-GT", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td>{order.totalPrice.toFixed(2)}</td>
                      <td>
                        {order.isPaid && order.paidAt ? (
                          new Date(order.paidAt).toLocaleDateString("es-GT", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        ) : (
                          <FaTimes style={{ color: "red" }} />
                        )}
                      </td>
                      <td>
                        {order.isDelivered && order.deliveredAt ? (
                          new Date(order.deliveredAt).toLocaleDateString(
                            "es-GT",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        ) : (
                          <FaTimes style={{ color: "red" }} />
                        )}
                      </td>
                      <td>
                        <Link
                          to={`/order/${order._id}`}
                          className="btn btn-primary"
                        >
                          Detalles
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
