import { PRODUCTS_URL } from "../../utils/constants";
import { apiSlice } from "./apiSlice";

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      providesTags: ["Products"],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),
      providesTags: (_result, _error, id) => [
        { type: "Products", id: "LIST" },
        { type: "Products", id: id },
      ],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApiSlice;
