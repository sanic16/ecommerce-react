import classes from "./loader.module.css";

const Loader = () => {
  return (
    <div className={classes.loader__text}>
      <div className={classes.text}>Cargando</div>
      <div className={classes.ring}></div>
    </div>
  );
};

export default Loader;
