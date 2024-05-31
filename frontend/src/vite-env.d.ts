/// <reference types="vite/client" />

type Product = {
  _id: string;
  user: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  reviews: Review[];
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  createdAt?: Date;
  updatedAt?: Date;
};

type ProductCard = Pick<
  Product,
  "_id" | "name" | "image" | "price" | "rating" | "numReviews"
>;

type Auth = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
} | null;

type LoginUser = {
  email: string;
  password: string;
};

type RegisterUser = LoginUser & {
  name: string;
};

type CartItem = ProductCard & {
  qty: number;
};

type ShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

type PaymentMethod = "PayPal" | "Banrural" | "G&T" | "BAC" | "BI";

type CartState = {
  cartItems: CartItem[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  shippingAddress: ShippingAddress;
};
