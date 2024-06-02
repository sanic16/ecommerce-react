type OrderItems = {
  _id: string;
  name: string;
  qty: number;
  image: string;
  price: number;
  product: string;
}[];

type ShippingAddress = {
  address: string;
  municipalty: string;
  department: string;
  zipcode: string;
};

type PaymentMethod = string;

type Payment = {
  orderItems: OrderItems;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
};
