import classes from "./profile.module.css";
import Heading from "../../components/heading/Heading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetMyOrdersQuery } from "../../store/slices/ordersApiSlice";
import { useUpdateProfileMutation } from "../../store/slices/authApiSlice";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { setCredentials } from "../../store/slices/authSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { userInfo } = useSelector(
    (state: { auth: { userInfo: Auth } }) => state.auth
  );

  useEffect(() => {
    if (userInfo) {
      setUserData({
        name: userInfo.name,
        email: userInfo.email,
        password: "",
        confirmPassword: "",
      });
    }
  }, [userInfo]);

  const [updateProfile, { isLoading: loadingUpdate }] =
    useUpdateProfileMutation();
  const { data: orders, isLoading, isError } = useGetMyOrdersQuery();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
    } else {
      try {
        const res = await updateProfile({
          name: userData.name,
          email: userData.email,
          password: userData.password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Perfil actualizado");
      } catch (error) {
        toast.error("Error al actualizar el perfil");
      }
    }
  };

  return (
    <section className={classes.profile}>
      <Heading>Mi perfil</Heading>
      <div className={classes.profile__container}>
        <div className={classes.profile__info}>
          <h3>Información de usuario</h3>
          <form onSubmit={submitHandler}>
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
            <button className="btn bnt-primary" disabled={loadingUpdate}>
              {loadingUpdate ? "Cargando..." : "Actualizar"}
            </button>
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
