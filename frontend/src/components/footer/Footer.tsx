import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa6";
import classes from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={`container ${classes.footer__container}`}>
        <article>
          <h4 className={classes.footer__logo}>Coral y Mar</h4>
          <p>
            Coral y Mar es un acuario que se dedica a la venta de peces,
            acuarios, plantas y accesorios para acuarios.
          </p>
          <div className={classes.footer__socials}>
            <a
              href="https://linkeding.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              <FaInstagram />
            </a>
          </div>
        </article>
        <div>
          <h4>Información</h4>
          <ul>
            <li>
              <a href="mailto:julio.sanic.gt.256@gmail.com">
                Correo: julio.sanic.gt.256@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+50258385370">Teléfono: 58385370</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Categorías</h4>
          <ul>
            <li>Peces de agua dulce</li>
            <li>Peces de agua salada</li>
            <li>Accesorios para acuarios</li>
            <li>Plantas para acuarios</li>
            <li>Otros productos</li>
          </ul>
        </div>
        <div>
          <h4>Soporte</h4>
          <ul>
            <li>Preguntas frecuentes</li>
            <li>Términos y condiciones</li>
            <li>Políticas de privacidad</li>
            <li>Contacto</li>
          </ul>
        </div>
      </div>
      <div className={classes.copyright}>
        <p>
          &copy; {new Date().getFullYear()} <span>Coral y Mar</span>. Todos los
          derechos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
