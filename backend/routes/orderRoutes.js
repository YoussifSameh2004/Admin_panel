import express from 'express';
import {
  getOrders,
  createOrder,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect, adminOnly, staffOrAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, staffOrAdmin, getOrders)    // only staff/admin
  .post(protect, createOrder);              // any logged in user

router.route('/:id/status')
  .put(protect, adminOnly, updateOrderStatus);

export default router;
