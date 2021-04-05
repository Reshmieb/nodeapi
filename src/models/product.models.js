'use strict';
var dbConn = require('./../../lib/db.js');
//product object create
var product = function(product){
  this.product_name     = product.product_name;
  this.product_description      = product.product_description;
  this.product_category         = product.product_category;
  this.product_price            = product.product_price;
  this.product_qty              = product.product_qty;
  this.created_at     = new Date();
  this.updated_at     = new Date();
};

/**
 * 
 * @method post 
 * @ insert product into database
 */

product.create = function (newProduct, result) {
dbConn.query("INSERT INTO products set ?", newProduct, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  console.log(res.insertId);
  result(null, res.insertId);
}
});
};

/**
 * 
 * @method get 
 * @ Get product by product id
 */


product.findById = function (id, result) {
dbConn.query("Select * from products where id = ? ", id, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  result(null, res);
}
});
};

/**
 * 
 * @method get 
 * @ Get all product
 */

product.findAll = function (result) {
dbConn.query("Select * from products", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('product : ', res);
  result(null, res);
}
});
};

/**
 * 
 * @method put 
 * @ update product using product id
 */

product.update = function(id, product, result){
dbConn.query("UPDATE products SET product_name=?,product_description=?,product_category=?,product_price=?,product_qty=? WHERE id = ?", [product.product_name,product.product_description,product.product_category,product.product_price,product.product_qty, id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
});
};

/**
 * 
 * @method delete 
 * @ Delete  product into database
 */


product.delete = function(id, result){
dbConn.query("DELETE FROM products WHERE id = ?", [id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
};
module.exports= product;