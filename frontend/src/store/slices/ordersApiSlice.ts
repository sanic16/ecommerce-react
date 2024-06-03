import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../../utils/constants";

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
    payOrder: builder.mutation<
      PaymentResult,
      { orderId: string; details: PaymentResult }
    >({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
      }),
    }),
    getPayPalClientId: builder.query<{ clientId: string }, void>({
      query: () => ({
        url: PAYPAL_URL,
        method: "GET",
      }),
    }),
    getMyOrders: builder.query<Order[], void>({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetMyOrdersQuery,
} = ordersApiSlice;
