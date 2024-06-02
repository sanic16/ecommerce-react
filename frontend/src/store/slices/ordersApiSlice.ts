import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../../utils/constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<PaymentResult, Payment>({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
        credentials: "include",
      }),
    }),
    getOrderDetails: builder.query<Order, string>({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } =
  ordersApiSlice;
