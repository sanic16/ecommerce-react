import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import classes from "./pagination.module.css";
import { Link } from "react-router-dom";

const Pagination = ({ page, pages }: { page: number; pages: number }) => {
  console.log("page", page, "pages", pages);
  return (
    <div className={classes.pagination}>
      {page > 1 && (
        <Link to={`/page/${page - 1}`} className={classes.page__control}>
          <FaArrowLeft />
        </Link>
      )}
      {[...Array(pages).keys()].map((x) => (
        <Link
          to={`/page/${x + 1}`}
          key={x}
          className={`${classes.page__number} ${
            page === x + 1 && classes.active
          }`}
        >
          {x + 1}
        </Link>
      ))}
      {page < pages && (
        <Link to={`/page/${page + 1}`} className={classes.page__control}>
          <FaArrowRight />
        </Link>
      )}
    </div>
  );
};

export default Pagination;
