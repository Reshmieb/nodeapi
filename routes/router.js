
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../lib/db.js');
const userMiddleware = require('../middleware/users.js');
router.post('sign-up', userMiddleware.validateRegister, (req, res, next) => {});
router.post('login', (req, res, next) => {});

const productController =   require('../src/controllers/product.controller');
// Retrieve all product
router.get('/getallproduct', productController.findAll);
// Create a new product
router.post('/insertproduct', productController.create);
// Retrieve a single product with id
router.get('/getproductbyid/:id', productController.findById);
// Update a product with id
router.put('/updateproduct/:id', productController.update);
// Delete a product with id
router.delete('/deleteproduct/:id', productController.delete);

module.exports = router;

  /**
 * 
 * @method post 
 * @ User Registration 
 */


router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {
    db.query(
      `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
        req.body.email
      )});`,
      (err, result) => {
        if (result.length) {
          return res.status(409).send({
            status:0,  
            message: 'This email is already in use!',
            statusCode:409,
            data:null
          });
        } else {
          // email is available
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({
                status:0,  
                message: err,
                statusCode:200,
                data:null
              });
            } else {
              // has hashed pw => add to database
              db.query(
                `INSERT INTO users (name,email, password,address) VALUES (${db.escape(
                  req.body.name
                )},${db.escape(
                    req.body.email
                  )}, ${db.escape(hash)},${db.escape(
                    req.body.address
                  )})`,
                (err, result) => {
                  if (err) {
                    throw err;
                    return res.status(400).send({
                        status:0,  
                        message: err,
                        statusCode:200,
                        data:null
                    });
                  }
                  return res.status(201).send({
                    status:1,  
                    message: 'User has been registered successfully!',
                    statusCode:201,
                    data:result
                  });
                }
              );
            }
          });
        }
      }
    );
  });

  /**
 * 
 * @method post 
 * @ User login 
 */
router.post('/login', (req, res, next) => {
    db.query(
      `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
      (err, result) => {
        // user does not exists
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err
          });
        }
  
        if (!result.length) {
          return res.status(401).send({
            status:0,
            message:"Email or password is incorrect!",
            statusCode:401,
            data:null
          });
        
        }
  
        // check password
        bcrypt.compare(
          req.body.password,
          result[0]['password'],
          (bErr, bResult) => {
            // wrong password
            if (bErr) {
              throw bErr;
              return res.status(401).send({
                status:0,
                message:"Email or password is incorrect!",
                statusCode:401,
                data:null
              });
            }
  
            if (bResult) {
              const token = jwt.sign({
                  email: result[0].email,
                  userId: result[0].id
                },
                'SECRETKEY', {
                  expiresIn: '7d'
                }
              );

              return res.status(200).send({
                status:1,
                message: 'Logged in!',
                statusCode: 200,
                token,
                data: result[0]
              });
            }
            return res.status(401).send({
                status:0,
                message:"Email or password is incorrect!",
                statusCode:401,
                data:null
            });
          }
        );
      }
    );
  });