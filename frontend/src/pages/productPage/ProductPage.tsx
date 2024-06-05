import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import classes from "./productPage.module.css";
import Rating from "../../components/rating/Rating";
import {
  useGetProductQuery,
  useCreateProductReviewMutation,
} from "../../store/slices/productApiSlice";
import Loader from "../../components/loader/Loader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import Meta from "../../components/meta/Meta";
import UserComment from "./userComment/UserComment";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

  const { userInfo } = useSelector(
    (state: { auth: { userInfo: Auth } }) => state.auth
  );

  const { data: product, isLoading, isError } = useGetProductQuery(id!);
  const [createReview, { isLoading: isReviewLoading }] =
    useCreateProductReviewMutation();

  useEffect(() => {
    const body = document.querySelector("body") as HTMLElement;
    body.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  const addToCartHandler = () => {
    if (!product) return;
    dispatch(
      addToCart({
        ...product,
        qty,
      })
    );
    navigate("/cart");
  };

  return (
    <section id="detail" className={classes.product}>
      {product && (
        <Meta
          title={product.name}
          description={product.description}
          keywords={`${product.name} ${product.category} ${product.price}`}
          image={product.image}
        />
      )}
      <div className={classes.product__wrapper}>
        <Link to="/" className="btn">
          Volver
        </Link>
        {isLoading ? (
          <div className={classes.loader__wrapper}>
            <Loader />
          </div>
        ) : isError || !product ? (
          <h2>ERROR</h2>
        ) : (
          <>
            <div className={classes.product__details}>
              <div className={classes["product__details-col1"]}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className={classes["product__details-col2"]}>
                <h3>{product.name}</h3>
                <Rating
                  text={`${product.numReviews} opiniones`}
                  value={product.rating}
                />
                <p>
                  Precio: <strong>${product.price}</strong>
                </p>
                <p>Descripción: {product.description}</p>
              </div>
              <div className={classes["product__details-col3"]}>
                <div>
                  <h5>Precio:</h5>
                  <span>${product.price}</span>
                </div>
                <div>
                  <h5>Estado:</h5>
                  <span>
                    {product.countInStock > 0 ? "En Stock" : "Agotado"}
                  </span>
                </div>
                {product.countInStock > 0 && (
                  <div>
                    <h5>Cantidad:</h5>
                    <select
                      value={qty}
                      onChange={(e) => setQty(parseInt(e.target.value))}
                      className={classes.qty}
                    >
                      {[
                        ...Array(
                          product.countInStock > 9 ? 6 : product.countInStock
                        ).keys(),
                      ].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <button
                    className={`btn ${
                      product.countInStock === 0 ? "disabled" : ""
                    }`}
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
            <UserComment
              productId={product._id}
              isReviewLoading={isReviewLoading}
              createReview={createReview}
              reviews={product.reviews}
              userInfo={userInfo}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default ProductPage;
