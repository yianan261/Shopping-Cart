import React, { useState } from "react";
import PropTypes from "prop-types";
import ShoppingCart from "../components/ShoppingCart";
import ProductList from "../components/ProductList";
import { items } from "../components/Items";
import ReactPaginate from "react-paginate";

const MainPage = ({ plm }) => {
  // const [itemInDB, setItemInDB] = useState([]);

  //"products" is the state variable in MainPage (a prop of ProductList)
  const [products, setProducts] = useState(items);

  //"productsInCart" is the state variable in MainPage that is a prop for ShoppingCart
  const [productsInCart, setProductsInCart] = useState(new Map());

  //Pagination implementation:
  // const listOfProducts = Array.from(productsInCart.entries());

  const [pageNumber, setPageNumber] = useState(0);

  const itemsPerPage = 20;
  const pagesVisited = pageNumber * itemsPerPage;

  const pageCount = Math.ceil(productsInCart.size / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  /**
   * function addProduct adds items to Shopping Cart and updates database
   * @param {object} takes the product that gets added
   */
  function addProduct(product) {
    //To keep it immutable
    const newProductsInCart = new Map(productsInCart);

    let currentQty = newProductsInCart.get(product.name);

    console.log("line 28, currentQTY", currentQty);

    //haven't added the product yet, this initializes the currentQty
    if (currentQty === undefined) {
      currentQty = { product: product, qty: 0 };
    }
    //currentQty is an object of the key { product: product, qty: 0 }
    currentQty.qty += 1;
    newProductsInCart.set(product.name, currentQty);
    setProductsInCart(newProductsInCart);
    plm.createItem(currentQty);
  }
  /**
   * function that removes product from list and database
   * @param {Map Object} productMap takes the map object
   * @param {Array} productArray takes an array
   */
  function removeProduct(productMap, productArray) {
    const newProductsInCart = new Map(productMap);
    let valueOfProduct = newProductsInCart.get(productArray[0]);
    valueOfProduct.qty -= 1;
    if (valueOfProduct.qty === 0) {
      plm.createItem(valueOfProduct);
      newProductsInCart.delete(productArray[0]);
    } else {
      plm.createItem(valueOfProduct);
      newProductsInCart.set(productArray[0], valueOfProduct);
    }
    setProductsInCart(newProductsInCart);
  }

  return (
    <div className="ShoppingPage">
      <h1 style={{ textAlign: "center" }}>My Shopping Cart</h1>
      <div style={{ display: "flex" }}>
        <div style={{ width: "60%" }}>
          <ProductList
            products={products}
            addProduct={addProduct}
          ></ProductList>
        </div>
        <div style={{ width: "40%" }}>
          <ShoppingCart
            productsInCart={productsInCart}
            removeProduct={removeProduct}
            plm={plm}
            pagesVisited={pagesVisited}
            itemsPerPage={itemsPerPage}
          ></ShoppingCart>
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      </div>
    </div>
  );
};
MainPage.propTypes = {
  plm: PropTypes.object.isRequired,
};
export default MainPage;
