import { type Response } from "express";
import { type CustomRequest } from "../../types/CustomRequest";
import {
  addOrder,
  deleteOrder,
  getOrderById,
  updateOrder,
} from "../../utils/db/request/OrderQueries";
import { Order, OrderSimple } from "../../types/Order";

// Get one order by ID
export const getOrderByIdController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const data = await getOrderById(id);
    if (!data)
      return res.status(404).json({ message: `No order with the id ${id}` });
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Add order to DB
export const addOrderController = async (req: CustomRequest, res: Response) => {
  try {
    const username = req.username!;
    const data: OrderSimple = req.body;

    await addOrder(data, username);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Update order by ID
export const updateOrderController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const data: Order = req.body;
    const id = Number(req.params.id);
    await updateOrder(data, id);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Delete order by ID
export const deleteOrderController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    await deleteOrder(id);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
