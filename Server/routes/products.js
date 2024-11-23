import express from 'express';
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products.js';

export const productsRouter = express.Router();

productsRouter.route('/').get(getAllProducts).post(createProduct);

productsRouter
  .route('/:id')
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);
