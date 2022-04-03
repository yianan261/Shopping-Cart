import React from "react";
import Product from "./Product.js";
import PropTypes from "prop-types";

const ProductList = ({ products, addProduct }) => {
  return (
    <div className="ProductList">
      <h2 style={{ paddingLeft: "20%" }}>Products</h2>
      <div>
        {products.map((p, i) => (
          <Product
            key={"product" + i}
            products={p}
            addProduct={addProduct}
          ></Product>
        ))}
      </div>
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  addProduct: PropTypes.func.isRequired,
};
export default ProductList;
