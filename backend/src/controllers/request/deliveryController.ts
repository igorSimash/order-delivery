import { Response } from "express";
import { CustomRequest } from "../../types/CustomRequest";
import { Delivery, DeliverySimple } from "../../types/Delivery";
import {
  addDelivery,
  deleteDelivery,
  getDeliveryById,
  updateDelivery,
} from "../../utils/db/request/DeliveryQueries";

// Get one delivery by ID
export const getDeliveryByIdController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const data = await getDeliveryById(id);
    if (!data)
      return res.status(404).json({ message: `No delivery with the id ${id}` });
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Add delivery to DB
export const addDeliveryController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const username = req.username!;
    const data: DeliverySimple = req.body;
    await addDelivery(data, username);
    return res.sendStatus(201);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Update delivery by ID
export const updateDeliveryController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const data: Delivery = req.body;
    const id = Number(req.params.id);
    await updateDelivery(data, id);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
// Delete delivery by ID
export const deleteDeliveryController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    await deleteDelivery(id);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
