import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../utils/cartUtils";

const initialState: CartState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") || "{}")
  : {
      cartItems: [],
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
      paymentMethod: "PayPal",
      shippingAddress: {
        address: "",
        municipality: "",
        department: "",
        zipcode: "",
      },
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: { payload: CartItem }) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      updateCart(state);
    },
    removeFromCart: (state, action: { payload: string }) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      updateCart(state);
    },
    saveShippingAddress: (state, action: { payload: ShippingAddress }) => {
      state.shippingAddress = action.payload;
      updateCart(state);
    },
    savePaymentMethod: (state, action: { payload: PaymentMethod }) => {
      state.paymentMethod = action.payload;
      updateCart(state);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      updateCart(state);
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;
