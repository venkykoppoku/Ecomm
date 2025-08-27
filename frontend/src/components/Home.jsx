import React, { useEffect } from "react";
import MetaData from "./layout/Metadata";
import { useGetProductsQuery } from "../redux/api/productApi";
import ProductItem from "./product/ProductItem";
import Loader from "./layout/Loader";
import toast from "react-hot-toast";
import CustomPagination from "./layout/CustomPagination";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  let [searchParams] = useSearchParams();
  const pageIndex = searchParams.get("pageIndex") || 1;

  const params = { pageIndex };
  const { data, isLoading, error, isError } = useGetProductsQuery(params);

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
        <div className="col-12 col-sm-6 col-md-12">
          <h1 id="products_heading" className="text-secondary">
            Latest Products
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.products?.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>
          </section>
          <CustomPagination resPerPage={4} totalItemsCount={data?.total} />
        </div>
      </div>
    </>
  );
};

export default Home;
