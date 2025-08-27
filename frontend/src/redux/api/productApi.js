import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
        params: {
          pageIndex: params.pageIndex,
          pageSize: 4,
          search: params.search,
          minPrice: params.min,
          maxPrice: params.max,
          category: params.category,
        },
      }),
    }),
    getProductDetails: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productAPI;
