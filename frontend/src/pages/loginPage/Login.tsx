import { useState, useEffect } from "react";
import classes from "./login.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../store/slices/authApiSlice";
import { setCredentials } from "../../store/slices/authSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector(
    (state: { auth: { userInfo: Auth } }) => state.auth
  );

  const { search } = useLocation();

  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({
        email: userData.email,
        password: userData.password,
      }).unwrap();
      if (!res) {
        throw new Error("Error al iniciar sesión");
      }
      dispatch(
        setCredentials({
          _id: res._id,
          name: res.name,
          email: res.email,
          isAdmin: res.isAdmin,
          exp: res.exp,
        })
      );
      toast.success("Sesión iniciada con éxito");
      navigate(redirect);
    } catch (error: unknown) {
      toast.error("Error al iniciar sesión");
      return;
    }
  };

  return (
    <section className={classes.login}>
      <div className={`container ${classes.login__container}`}>
        <h2>Iniciar Sesión</h2>
        <form
          className={`${classes.form} ${classes.login__form}`}
          onSubmit={submitHandler}
        >
          <input
            type="email"
            placeholder="Correo Electrónico"
            name="email"
            autoComplete="new-email"
            value={userData.email}
            onChange={handleInputChange}
            autoFocus
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            autoComplete="new-password"
          />
          {isLoading ? (
            <button className="btn disabled" type="submit" disabled>
              Iniciando sesión...
            </button>
          ) : (
            <button className="btn" type="submit">
              Iniciar Sesión
            </button>
          )}
        </form>
        <small>
          ¿No tienes cuenta aún ?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Registrarse
          </Link>
        </small>
      </div>
    </section>
  );
};

export default LoginPage;
