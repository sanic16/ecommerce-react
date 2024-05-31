import { Link, useLocation } from "react-router-dom";
import classes from "./registerPage.module.css";

const RegisterPage = () => {
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  return (
    <section className={classes.register}>
      <div className={`container ${classes.register__container}`}>
        <h2>Registrarse</h2>
      </div>
      <form className={`form ${classes.register__form}`}>
        <input
          type="text"
          placeholder="Nombre de Usuario"
          name="username"
          autoFocus
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          name="email"
          autoComplete="new-email"
        />
        <input
          type="password"
          placeholder="Contraseña"
          name="password"
          autoComplete="new-password"
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          name="confirmPassword"
          autoComplete="new-password"
        />
        <button className="btn" type="submit">
          Registrarse
        </button>
      </form>
      <small>
        ¿Ya tienes una cuenta?{" "}
        <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
          Iniciar Sesión
        </Link>
      </small>
    </section>
  );
};

export default RegisterPage;
