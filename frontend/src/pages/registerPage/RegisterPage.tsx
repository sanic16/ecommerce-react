import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classes from "./registerPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../store/slices/authApiSlice";
import { setCredentials } from "../../store/slices/authSlice";
import { toast } from "react-toastify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isApiError(error: any): error is ApiError {
  return (
    error &&
    typeof error === "object" &&
    "data" in error &&
    typeof error.data === "object" &&
    "message" in error.data &&
    typeof error.data.message === "string"
  );
}

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const userInfo = useSelector((state: { userInfo: Auth }) => state.userInfo);

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

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    try {
      const res = await register({
        name: userData.username,
        email: userData.email,
        password: userData.password,
      }).unwrap();
      if (!res) throw new Error("Error al registrarse");

      dispatch(
        setCredentials({
          _id: res._id,
          name: res.name,
          email: res.email,
          isAdmin: res.isAdmin,
          exp: res.exp,
        })
      );
      toast.success("Registrado con éxito!");
      navigate(redirect);
    } catch (error: unknown) {
      if (isApiError(error)) {
        toast.error(error.data.message);
        return;
      }
      toast.error("Error al registrarse");
      return;
    }
  };

  return (
    <section className={classes.register}>
      <div className={`container ${classes.register__container}`}>
        <h2>Registrarse</h2>

        <form
          className={`${classes.form} ${classes.register__form}`}
          onSubmit={handleRegisterSubmit}
        >
          <input
            type="text"
            placeholder="Nombre de Usuario"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            autoFocus
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            autoComplete="new-email"
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            autoComplete="new-password"
          />
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleInputChange}
            autoComplete="new-password"
          />
          {isLoading ? (
            <button className="btn disabled" type="submit" disabled>
              Registrando...
            </button>
          ) : (
            <button className="btn" type="submit">
              Registrarse
            </button>
          )}
        </form>
        <small>
          ¿Ya tienes una cuenta?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Iniciar Sesión
          </Link>
        </small>
      </div>
    </section>
  );
};

export default RegisterPage;
