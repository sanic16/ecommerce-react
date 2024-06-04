"use client";

import { FaPause, FaPlay } from "react-icons/fa";
import classes from "./productCarousel.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGetTopProductsQuery } from "../../store/slices/productApiSlice";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering] = useState(false);
  const interval = useRef<NodeJS.Timeout | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const { data: topProducts, isLoading, isError } = useGetTopProductsQuery();

  useEffect(() => {
    if (topProducts) {
      setProducts(topProducts);
    }
  }, [topProducts]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  }, [products]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev + products.length - 1) % products.length);
  };

  useEffect(() => {
    if (isPlaying) {
      interval.current = setInterval(() => {
        nextSlide();
      }, 15000);
    } else {
      clearInterval(interval.current!);
    }

    return () => clearInterval(interval.current!);
  }, [isPlaying, nextSlide]);

  return (
    <div className={classes.slideshow__container}>
      <div className={classes.slideshow__wrapper}>
        <div className={classes.slides}>
          {isLoading ? (
            <Loader />
          ) : isError || !products ? (
            <p></p>
          ) : (
            products.map((product) => {
              if (product === products[currentSlide]) {
                return (
                  <div key={product._id} className={classes.slide}>
                    <div className={classes.slide__image}>
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className={classes.slide__content}>
                      <Link to={`/product/${product._id}`}>
                        <h2>
                          {window.innerWidth < 768
                            ? product.name.length > 25
                              ? product.name.substring(0, 25) + "..."
                              : product.name
                            : product.name}
                        </h2>
                      </Link>
                      <div className={classes.slide__info}>
                        <p>
                          Fecha de ingreso:{" "}
                          {new Date(product.createdAt!).toLocaleDateString(
                            "es-GT",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                        <p>
                          {product.description.length > 150
                            ? product.description.substring(0, 150) + "..."
                            : product.description}
                        </p>
                        <Link
                          className="btn secondary"
                          to={`/product/${product._id}`}
                        >
                          Precio: Q{product.price}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }
            })
          )}
        </div>
        {!isPlaying && (
          <div
            className={`${isHovering && classes.hover} ${classes.control} ${
              classes.left__arrow
            }`}
            onClick={prevSlide}
          >
            <div className={classes.arrow}>
              <div className={`${classes.line} ${classes.line__1}`}></div>
              <div className={`${classes.line} ${classes.line__2}`}></div>
            </div>
          </div>
        )}

        {!isPlaying && (
          <div
            className={`${isHovering && classes.hover} ${classes.control} ${
              classes.right__arrow
            }`}
            onClick={nextSlide}
          >
            <div className={classes.arrow}>
              <div className={`${classes.line} ${classes.line__3}`}></div>
              <div className={`${classes.line} ${classes.line__4}`}></div>
            </div>
          </div>
        )}

        <div
          className={classes.play__pause}
          onClick={() => setIsPlaying((prev) => !prev)}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
