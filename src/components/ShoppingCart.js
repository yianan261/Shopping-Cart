import React from "react";
import PropTypes from "prop-types";

const ShoppingCart = ({
  productsInCart,
  removeProduct,
  pagesVisited,
  itemsPerPage,
}) => {
  //reduce function to get total: takes an arry and adds curr value to prefix sum, second parameter is the default start value
  let total = Array.from(productsInCart.values()).reduce(
    (pTotal, p) => pTotal + p.qty * p.product.price,
    0
  );

  /**
   * function to render products in cart
   * @returns list of products added to shopping cart
   */
  function renderProductsInCart() {
    return (
      <span>
        <h3>Items</h3>

        {Array.from(productsInCart.entries())
          .slice(pagesVisited, pagesVisited + itemsPerPage)
          .map(([name, { product, qty }], idx) => (
            <div key={"cart_item" + name} style={{ paddingBottom: "15px" }}>
              {idx + 1}. {product.name} ${product.price.toFixed(2)} , Quantity:{" "}
              {qty}{" "}
              <button
                onClick={() => {
                  if (qty > 0)
                    removeProduct(productsInCart, [name, { product, qty }]);
                }}
              >
                -
              </button>
            </div>
          ))}
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
