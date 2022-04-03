import React from "react";
import PropTypes from "prop-types";

const Product = ({ products, addProduct }) => {
  return (
    <div className="Product">
      <ul className="productList">
        <li>
          {products.name} ${products.price.toFixed(2)}{" "}
          <button onClick={() => addProduct(products)}> +</button>
        </li>
      </ul>
    </div>
  );
};

Product.propTypes = {
  products: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired,
};
export default Product;
