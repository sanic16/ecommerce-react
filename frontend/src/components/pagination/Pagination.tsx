import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import classes from "./pagination.module.css";
import { Link } from "react-router-dom";

const Pagination = ({
  page,
  pages,
  path,
}: {
  page: number;
  pages: number;
  path: string;
}) => {
  return (
    <div className={classes.pagination}>
      {page > 1 && (
        <Link to={`/${path}/${page - 1}`} className={classes.page__control}>
          <FaArrowLeft />
        </Link>
      )}
      {[...Array(pages).keys()].map((x) => (
        <Link
          to={`/${path}/${x + 1}`}
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
