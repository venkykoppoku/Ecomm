import React from "react";
import { Helmet } from "@dr.pogodin/react-helmet";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - ShopIT`}</title>
    </Helmet>
  );
};

export default MetaData;
