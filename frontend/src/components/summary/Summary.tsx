import classes from "./summary.module.css";

const Summary = ({
  itemsPrice,
  shippingPrice,
  taxPrice,
  totalPrice,
  isLoading,
  onSubmit,
}: {
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isLoading: boolean;
  onSubmit?: () => void;
}) => {
  return (
    <div className={classes.summary}>
      <h3>Resumen de la orden</h3>
      <div>
        <div>
          <strong>Productos</strong>
          <span>Q{itemsPrice.toFixed(2)}</span>
        </div>
      </div>
      <div>
        <div>
          <strong>Envío</strong>
          <span>Q{shippingPrice.toFixed(2)}</span>
        </div>
      </div>
      <div>
        <div>
          <strong>Impuestos</strong>
          <span>Q{taxPrice.toFixed(2)}</span>
        </div>
      </div>
      <div>
        <div>
          <strong>Total</strong>
          <span>Q{totalPrice.toFixed(2)}</span>
        </div>
      </div>
      <div>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={isLoading}
          onClick={onSubmit}
        >
          {isLoading ? "Procesando..." : "Realizar pedido"}
        </button>
      </div>
    </div>
  );
};

export default Summary;
