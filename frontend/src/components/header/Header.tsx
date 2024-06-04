import { FaBars, FaShoppingCart, FaTimes, FaUser } from "react-icons/fa";
import classes from "./header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../store/slices/authApiSlice";
import { logout } from "../../store/slices/authSlice";
import { toast } from "react-toastify";
import { IoColorWand } from "react-icons/io5";
import { useState } from "react";
import SearchBox from "../searchBox/SearchBox";

const Header = () => {
  const { cartItems } = useSelector((state: { cart: CartState }) => state.cart);
  const { userInfo } = useSelector(
    (state: { auth: { userInfo: Auth } }) => state.auth
  );
  const qty = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutMutation] = useLogoutMutation();
  const [isOpened, setIsOpened] = useState(false);

  const closeMenu = () => {
    setIsOpened(false);
  };

  const logoutHandler = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logout());
      navigate("/");
      toast.success("Sesión cerrada con éxito.");
    } catch (error: unknown) {
      toast.error("Error al cerrar sesión.");
    }
  };

  return (
    <nav className={classes.nav} id="nav">
      <div className={`container ${classes.nav__container}`}>
        <div className={classes.nav__logo}>
          <Link to="/">Coral y Mar</Link>
        </div>

        <SearchBox />

        <ul className={`${classes.nav__menu} ${isOpened && classes.active}`}>
          <li>
            <button className={classes.nav__theme}>
              <IoColorWand />
            </button>
          </li>
          <li>
            <Link to="/cart" className={classes["nav__menu-item"]}>
              <FaShoppingCart />
              {qty > 0 ? (
                <span className={classes["nav__cart-qty"]}>({qty})</span>
              ) : null}{" "}
              Carrito
            </Link>
          </li>
          {userInfo ? (
            <li className={classes["nav__menu-user"]}>
              <Link to="/profile" className={classes["nav__menu-item"]}>
                <FaUser /> {userInfo.name}
              </Link>
              <div className={classes["nav__menu-user-menu"]}>
                <ul>
                  <li>
                    <Link to="/profile">Perfil</Link>
                  </li>
                  <li onClick={logoutHandler}>
                    <a href={"#"}>Cerrar Sesión</a>
                  </li>
                </ul>
              </div>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className={classes["nav__menu-item"]}
                onClick={closeMenu}
              >
                <FaUser /> Iniciar sesión
              </Link>
            </li>
          )}
        </ul>

        <button
          className={classes["nav__toggle-btn"]}
          onClick={() => setIsOpened((prev) => !prev)}
        >
          {isOpened ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
