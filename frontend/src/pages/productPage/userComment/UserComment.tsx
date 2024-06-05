import { useState } from "react";
import { toast } from "react-toastify";
import classes from "./userComment.module.css";
import { Link } from "react-router-dom";
import Rating from "../../../components/rating/Rating";

const UserComment = ({
  productId,
  isReviewLoading,
  createReview,
  reviews,
  userInfo,
}: {
  productId: string;
  isReviewLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createReview: any;
  reviews: {
    _id: string;
    name: string;
    rating: number;
    comment: string;
    createdAt: string;
  }[];
  userInfo: { name: string; email: string; isAdmin: boolean } | null;
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const reviewHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productId) return;
    try {
      await createReview({
        id: productId,
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
    <div className={classes.reviews}>
      <h2>Opiniones</h2>
      {reviews.length === 0 && <p>Sin opiniones</p>}
      {reviews.length > 0 && (
        <div className={classes.comments}>
          {reviews.map((review) => (
            <div key={review._id} className={classes.comment}>
              <strong>{review.name}</strong>
              <Rating value={review.rating} text="" />
              <p>{review.createdAt?.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      )}
      {userInfo ? (
        <div className={classes.comment__form}>
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
          <Link to={`/login?redirect=/product/${productId}`}>
            Inicia sesión
          </Link>{" "}
          para dejar una opinión
        </p>
      )}
    </div>
  );
};

export default UserComment;
