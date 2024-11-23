import express from 'express';
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products.js';

export const productRouter = express.Router();

productRouter.route('/').get(getAllProducts).post(createProduct);

productRouter
  .route('/:id')
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);
