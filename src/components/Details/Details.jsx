import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productsContext } from "../../contexts/productsContext";

const Details = () => {
  const { id } = useParams();
  const { oneProduct, getOneProduct } = useContext(productsContext);

  useEffect(() => {
    getOneProduct(id);
  }, []);
  // console.log(oneProduct);

  return <div>details</div>;
};

export default Details;
