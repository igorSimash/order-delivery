import express from "express";
import {
  addOrderController,
  updateOrderController,
  deleteOrderController,
  getOrderByIdController,
} from "../../controllers/request/orderController";
import {
  addDeliveryController,
  deleteDeliveryController,
  getDeliveryByIdController,
  updateDeliveryController,
} from "../../controllers/request/deliveryController";
import { getRequestsController } from "../../controllers/request/requestsController";
import { authorization } from "../../middlewares/checkAccess";
const router = express.Router();

// Only ORDER routes
router.get("/order/:id", authorization, getOrderByIdController);
router.post("/order", authorization, addOrderController);
router.put("/order/:id", authorization, updateOrderController);
router.delete("/order/:id", authorization, deleteOrderController);

// Only DELIVERY routes
router.get("/delivery/:id", authorization, getDeliveryByIdController);
router.post("/delivery", authorization, addDeliveryController);
router.put("/delivery/:id", authorization, updateDeliveryController);
router.delete("/delivery/:id", authorization, deleteDeliveryController);

// Routes with ORDER, DELIVERY, POTENTIAL requests
router.get("/", authorization, getRequestsController);

export default router;
