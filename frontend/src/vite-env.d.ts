/// <reference types="vite/client" />

type Product = {
  _id: string;
  user: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  reviews: {
    user: string;
    name: string;
    rating: number;
    comment: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  }[];
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

type UserInfo = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  exp: number;
};
type Auth = UserInfo | null;

type UserUpdate = {
  name?: string;
  email?: string;
  password?: string;
};

type LoginUser = {
  email: string;
  password: string;
};

type RegisterUser = LoginUser & {
  name: string;
};

type CartItem = Product & {
  qty: number;
};

type ShippingAddress = {
  address: string;
  municipality: string;
  department: string;
  zipcode: string;
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

interface ApiError {
  data: {
    message: string;
  };
}

type OrderItems = {
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

type PaymentResult = {
  __v: number;
  _id: string;
  createdAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  itemsPrice: number;
  orderItems: {
    _id: string;
    image: string;
    name: string;
    price: number;
    product: string;
    qty: number;
  }[];
  paymentMethod: string;
  shippingAddress: {
    address: string;
    department: string;
    municipalty: string;
    zipcode: string;
  };
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  updatedAt: string;
  user: string;
};

type Order = {
  shippingAddress: {
    address: string;
    municipality: string;
    department: string;
    zipcode: string;
  };
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  orderItems: {
    name: string;
    qty: number;
    image: string;
    price: number;
    product: string;
    _id: string;
  }[];
  paymentMethod: "PayPal" | "Banrural" | "G&T" | "BAC" | "BI";
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
  deliveredAt?: string;
  paidAt?: string;
  __v: number;
};
