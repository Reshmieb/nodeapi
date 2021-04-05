'use strict';
const product = require('../models/product.models');

/**
 * 
 * @method get 
 * @ Get all product
 */

exports.findAll = function(req, res) {
product.findAll(function(err, product) {
  console.log('controller')
  if (err)
  res.send({status:0,message:err,statusCode:400,data:null});
  console.log('res', product);
  //res.send(product);
  res.send({status:1,message:"fatch data successfully!",statusCode:200,data:product});
});
};

/**
 * 
 * @method post 
 * @ insert product into database
 */

exports.create = function(req, res) {
const new_product = new product(req.body);
//handles null error
if(req.body.constructor === Object && Object.keys(req.body).length === 0){
  res.status(400).send({ status:0, message: 'Please provide all required field',statusCode:402,data:null});
}else{
product.create(new_product, function(err, product) {
  if (err)
  res.send({status:1,message:"Product added successfully!",statusCode:201,lastInsertId:product});
});
}
};

/**
 * 
 * @method get 
 * @ Get product by product id
 */


exports.findById = function(req, res) {
product.findById(req.params.id, function(err, product) {
  if (err)
  res.send(err);
  res.send({status:1,message:"Product fetch successfully!",statusCode:200,data:product});
});
};

/**
 * 
 * @method put 
 * @ update product using product id
 */

exports.update = function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ status:0, message: 'Please provide all required field',statusCode:402,data:null });
  }else{
    product.update(req.params.id, new product(req.body), function(err, product) {
   if (err)
   res.send(err);
   res.send({ status:1, message: 'Product successfully updated',statusCode:200,data:product });
});
}
};

/**
 * 
 * @method delete 
 * @ Delete  product into database
 */

exports.delete = function(req, res) {
product.delete( req.params.id, function(err, product) {
  if (err)
  res.send(err);
  res.send({ status:1, message: 'Product successfully deleted',statusCode:200,data:null });
});
};