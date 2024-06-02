import classes from "./heading.module.css";
const Heading = ({ children }: { children: React.ReactNode }) => {
  return <h2 className={classes.heading}>{children}</h2>;
};

export default Heading;
