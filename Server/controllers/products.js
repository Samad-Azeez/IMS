import { product_model } from '../models/Product.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

// get all products
const getAllProducts = async (req, res) => {
  // find all products created by the user and sort them by creation date
  const products = await product_model
    .find({ createdBy: req.user.userId })
    .sort({
      createdAt: 1,
    });

  const nbHits = products.length; // number of products found
  res.status(StatusCodes.OK).json({ products, nbHits });
};

// get a product
const getProduct = async (req, res) => {
  // get the user id and product id from the request object
  const {
    user: { userId },
    params: { id: productId },
  } = req;

  const product = await product_model.findOne({
    _id: productId,
    createdBy: userId,
  }); // find the product by id and user id

  // check if the product exists
  if (!product) {
    throw new NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

// create a product
const createProduct = async (req, res) => {
  req.body.createdBy = req.user.userId; // add the user id to the product object before creating it in the database
  const product = await product_model.create(req.body);

  res.status(StatusCodes.CREATED).json({ product });
};

// update a product
const updateProduct = async (req, res) => {
  // get the company, position, user id and product id from the request object
  const {
    body: { name, price, quantity, category },
    user: { userId },
    params: { id: productId },
  } = req;

  // check if the company and position are provided
  if (!name || !price || !quantity || !category) {
    throw new BadRequestError('fields are required');
  }

  // find the product by id and user id and update it
  const product = await product_model.findByIdAndUpdate(
    {
      _id: productId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true } // return the updated product and run validators
  );

  // check if the product exists
  if (!product) {
    throw new NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

// delete a product
const deleteProduct = async (req, res) => {
  // get the user id and product id from the request object
  const {
    user: { userId },
    params: { id: productId },
  } = req;

  // find the product by id and user id and delete it
  const product = await product_model.findOneAndDelete({
    _id: productId,
    createdBy: userId,
  });

  // check if the product exists
  if (!product) {
    throw new NotFoundError(`No product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ msg: 'Product deleted successfully' });
};

export {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
