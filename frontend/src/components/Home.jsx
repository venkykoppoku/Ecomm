import React, { useEffect } from "react";
import MetaData from "./layout/Metadata";
import { useGetProductsQuery } from "../redux/api/productApi";
import ProductItem from "./product/ProductItem";
import Loader from "./layout/Loader";
import toast from "react-hot-toast";
import CustomPagination from "./layout/CustomPagination";
import { useSearchParams } from "react-router-dom";
import Filters from "./layout/Filters";

const Home = () => {
  let [searchParams] = useSearchParams();
  const pageIndex = searchParams.get("pageIndex") || 1;
  const search = searchParams.get("search") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings");

  const params = { pageIndex, search };

  min !== null && (params.min = min);
  max !== null && (params.max = max);
  category !== null && (params.category = category);
  ratings !== null && (params.rating = ratings);

  const { data, isLoading, error, isError } = useGetProductsQuery(params);
  const columnSize = search ? 4 : 3;

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error?.data?.message]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <MetaData title={"But best products"} />
      <div className="row">
        {search && (
          <div className="col-6 col-md-3 mt-5">
            <Filters />
          </div>
        )}
        <div className={search ? "col-6 col-md-9" : "col-6 col-md-12"}>
          <h1 id="products_heading" className="text-secondary">
            {search
              ? `${data?.products?.length} products found with key: ${search}`
              : `Latest Products`}
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.products?.map((product) => (
                <ProductItem
                  key={product._id}
                  product={product}
                  columnSize={columnSize}
                />
              ))}
            </div>
          </section>
          {data?.total > 4 && (
            <CustomPagination resPerPage={4} totalItemsCount={data?.total} />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
