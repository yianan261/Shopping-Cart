// Require minimongo
import minimongo from "minimongo";

const IndexedDb = minimongo.IndexedDb;

//default parameter "ProductListDB"
function ProductListManager(_dbName = "ProductListDB") {
  const plm = {};

  const dbName = _dbName;

  /**
   * Inserts item into database
   * @param {object} inserts item object into DB
   * @returns
   */
  plm.createItem = (item) => {
    return new Promise((resolve, reject) => {
      // Create IndexedDb
      const db = new IndexedDb(
        { namespace: dbName },
        function () {
          // Add a collection to the database
          db.addCollection(
            "items",
            function () {
              db.items.upsert(item, resolve, reject);
            },
            reject
          );
        },
        reject
      );
    });
  };

  /**
   * removes item from DB
   * @param {object} takes parameter _id
   *
   */
  plm.removeItem = (_id) => {
    return new Promise((resolve, reject) => {
      // Create IndexedDb
      const db = new IndexedDb(
        { namespace: dbName },
        function () {
          // Add a collection to the database
          db.addCollection(
            "items",
            function () {
              db.items.remove({ _id: _id }, resolve, reject);
            },
            reject
          );
        },
        reject
      );
    });
  };

  return plm;
}

export default ProductListManager;
