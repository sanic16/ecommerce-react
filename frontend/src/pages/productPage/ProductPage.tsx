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
import { toast } from "react-toastify";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

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

  const reviewHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product) return;
    console.log(comment, rating);
    try {
      await createReview({
        id: product._id,
        comment: comment,
        rating: rating,
      }).unwrap();
      setRating(0);
      setComment("");
      toast.success("Opinión enviada");
    } catch (error) {
      toast.error("Error al enviar la opinión");
    }
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
            <div className={classes.reviews}>
              <h2>{product.reviews.length} Opiniones</h2>
              {product.reviews.length === 0 && <p>Sin opiniones</p>}
              {product.reviews.length > 0 && (
                <div>
                  {product.reviews.map((review) => (
                    <div key={review._id} className={classes.review}>
                      <strong>{review.name}</strong>
                      <p>{review.rating} </p>
                      <p>{review.createdAt?.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
              {userInfo ? (
                <div>
                  <h3>Califica este producto</h3>
                  <form onSubmit={reviewHandler}>
                    <div>
                      <label htmlFor="rating">Calificación</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                      >
                        <option value="1">1 - Malo</option>
                        <option value="2">2 - Regular</option>
                        <option value="3">3 - Bueno</option>
                        <option value="4">4 - Muy bueno</option>
                        <option value="5">5 - Excelente</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Comentario</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <button className="btn" disabled={isReviewLoading}>
                      {isReviewLoading ? "Enviando..." : "Enviar"}
                    </button>
                  </form>
                </div>
              ) : (
                <p>
                  <Link to={`/login?redirect=/product/${product._id}`}>
                    Inicia sesión
                  </Link>{" "}
                  para dejar una opinión
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductPage;
