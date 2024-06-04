import { PRODUCTS_URL } from "../../utils/constants";
import { apiSlice } from "./apiSlice";

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      { products: Product[]; page: number; pages: number },
      { pageNumber: number }
    >({
      query: ({ pageNumber }) => ({
        url: PRODUCTS_URL,
        params: { pageNumber },
      }),
      providesTags: ["Products"],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),
      // providesTags: (_result, _error, id) => [
      //   { type: "Products", id: "LIST" },
      //   { type: "Products", id: id },
      // ],
    }),
    getTopProducts: builder.query<Product[], void>({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
        method: "GET",
      }),
      providesTags: ["TopProducts"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetTopProductsQuery,
} = productsApiSlice;
