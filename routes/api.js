const express = require('express');
const rateLimit = require('express-rate-limit');
const apiLimiter = rateLimit({
    windowMs: 1000*60*3,   // 3 minutes
    max: 10,
    message: 'รอ 3 นาที!'
});
const router = express.Router();
const customerController = require('../controllers/customers');
const productController = require('../controllers/product');
const authController = require('../controllers/auth');
const userController = require('../controllers/users');

router.post('/customers', apiLimiter, customerController.createCustomer);
router.put('/customers', apiLimiter, customerController.updateCustomer);
router.delete('/customers/:id', apiLimiter, customerController.deleteCustomer);
router.get('/customers/:id', customerController.getCustomer);
router.get('/customers/q/:term', apiLimiter, customerController.getCustomersByTerm);
router.get('/customers', apiLimiter, customerController.getCustomers);
router.get('/customers', authController.verifyToken, customerController.getCustomers);

router.post('/products', apiLimiter, productController.createProduct);
router.put('/products', apiLimiter, productController.updateProduct);
router.delete('/products/:id', apiLimiter, productController.deleteProduct);
router.get('/products/:id', productController.getProduct);
router.get('/products/q/:term', apiLimiter, productController.getProductsByTerm);
router.get('/products', apiLimiter, productController.getProducts);

router.post('/users', userController.createUser);
router.post('/login', authController.login);
router.get('/logout', authController.logout);


module.exports = router;


/**
 * @swagger
 * components:
 *    schemas:
 *      Customer:
 *        type: object
 *        properties:
 *          customer_id:
 *            type: integer
 *            description: The unique identifier of the customer.
 *          first_name:
 *            type: string
 *            description: The customer's firstname.
 *          last_name:
 *            type: string
 *            description: The customer's lastname.
 *          address:
 *            type: string
 *            description: The customer's address.
 *          email:
 *            type: string
 *            description: The customer's email (unique).
 *          phone_number:
 *            type: string
 *            description: The customer's phone number.
 *        required:
 *          - none
 */

/**
 * @swagger
 * /api/v1/customers:
 *   get:
 *     summary: Get All Customers
 *     tags: [Customers]
 *     description: Returns a list of all customers in the database.
 *     responses:
 *       200:
 *         description: A list of customers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Internal server error.
 * 
 */

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   get:
 *     summary: Get Customer by ID
 *     tags: [Customers]
 *     description: Returns a single customer object based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique identifier of the customer.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Customer object found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating customer not found.
 *       500:
 *         description: Internal server error.
 *
 */

/**
 * @swagger
 * /api/v1/customers:
 *   post:
 *     summary: Create a new Customer 
 *     tags: [Customers]
 *     description: create a new customer on database 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Customer object created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Internal server error.
 *
 */

/**
 * @swagger
 * /api/v1/customers:
 *   put:
 *     summary: update Customer 
 *     tags: [Customers]
 *     description: update customer on database 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Customer object created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Internal server error.
 *
 */

/**
 * @swagger
 * /api/v1/customers/q/{term}:
 *   get:
 *     summary: Search Customers by first name or email
 *     tags: [Customers]
 *     description: Returns a list of customers that match the search term in either the first name or email fields.
 *     parameters:
 *       - in: path
 *         name: term
 *         description: The search term to filter customers by first name or email.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of customers that match the search criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       404:
 *         description: No Customers found matching the search criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating no customers found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   delete:
 *     summary: Delete Customer by ID
 *     tags: [Customers]
 *     description: Returns a single customer object based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique identifier of the customer.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Customer object found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating customer not found.
 *       500:
 *         description: Internal server error.
 *
 */

/**
 * @swagger
 * components:
 *    schemas:
 *      Product:
 *        type: object
 *        properties:
 *          product_id:
 *            type: integer
 *            description: The unique identifier of the Product.
 *          name:
 *            type: string
 *            description: The Product's name.
 *          description:
 *            type: string
 *            description: The Product's description.
 *          price:
 *            type: string
 *            description: The Product's price.
 *          category:
 *            type: string
 *            description: The Product's category (unique).
 *          image_url:
 *            type: string
 *            description: The Product's image_url.
 *        required:
 *          - none
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get All Products
 *     tags: [Products]
 *     description: Returns a list of all products in the database.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 * 
 */

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new Product 
 *     tags: [Products]
 *     description: create a new product on database 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product object created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 *
 */

/**
 * @swagger
 * /api/v1/products:
 *   put:
 *     summary: update Product 
 *     tags: [Products]
 *     description: update product on database 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product object created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 *
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get Product by ID
 *     tags: [Products]
 *     description: Returns a single product object based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique identifier of the product.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Product object found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating product not found.
 *       500:
 *         description: Internal server error.
 *
 */

/**
 * @swagger
 * /api/v1/products/q/{term}:
 *   get:
 *     summary: Search Products by Name or Category
 *     tags: [Products]
 *     description: Returns a list of products that match the search term in either the name or category fields.
 *     parameters:
 *       - in: path
 *         name: term
 *         description: The search term to filter products by name or category.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of products that match the search criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: No products found matching the search criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating no products found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete Product by ID
 *     tags: [Products]
 *     description: Returns a single product object based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique identifier of the product.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Product object found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating product not found.
 *       500:
 *         description: Internal server error.
 *
 */