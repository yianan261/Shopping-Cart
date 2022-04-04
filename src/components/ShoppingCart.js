import React from "react";
import PropTypes from "prop-types";

const ShoppingCart = ({ productsInCart, removeProduct }) => {
  //reduce function: takes an arry and adds curr value to prefix sum, second parameter is the default start value
  let total = Array.from(productsInCart.values()).reduce(
    (pTotal, p) => pTotal + p.qty * p.product.price,
    0
  );

  // function removeProduct(productMap, productArray) {
  //   console.log(
  //     "line12 ShoppingCart, removeProduct function, productMap, productArray: ",
  //     productMap,
  //     productArray
  //   );
  //   productMap.set(productArray[0], productMap.get(productArray[1].qty)-1);
  // }

  function renderProductsInCart() {
    return (
      <span>
        <h3>Items</h3>
        {console.log("line 24, ShoppingCart: ", productsInCart)}
        {Array.from(productsInCart.entries()).map(
          ([name, { product, qty }], idx) => (
            <div key={"cart_item" + name} style={{ paddingBottom: "15px" }}>
              {idx + 1}. {product.name} ${product.price.toFixed(2)} , Quantity:{" "}
              {qty}{" "}
              <button
                onClick={() =>
                  removeProduct(productsInCart, [name, { product, qty }])
                }
              >
                -
              </button>
            </div>
          )
        )}
      </span>
    );
  }

  return (
    <div className="ShoppingCart">
      <h2>Shopping Cart</h2>
      <label>
        Subtotal:
        <output> ${total.toFixed(2)}</output>
      </label>
      {productsInCart.size ? (
        renderProductsInCart()
      ) : (
        <div>No Products in Cart Yet</div>
      )}
    </div>
  );
};

ShoppingCart.propTypes = {
  productsInCart: PropTypes.object.isRequired,
};
export default ShoppingCart;
