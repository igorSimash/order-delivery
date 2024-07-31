import { getOrdersWithDeliveries } from "./../../utils/db/request/RequestQueries";
import { Response } from "express";
import { CustomRequest } from "../../types/CustomRequest";
import { getOrdersByUser } from "../../utils/db/request/OrderQueries";
import { getDeliveriesByUser } from "../../utils/db/request/DeliveryQueries";

// Get all orders, deliveries & potential (matched) requests by username
export const getRequestsController = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const username = req.username!;

    const { sortBy, order } = req.query;
    const validSortOpts = ["date", "id"];
    const sortOption = validSortOpts.includes(sortBy as string)
      ? (sortBy as string)
      : "id";

    const orders = await getOrdersByUser(username, sortOption, order as string);
    const deliveries = await getDeliveriesByUser(
      username,
      sortOption,
      order as string
    );
    const potentialRequests = await getOrdersWithDeliveries(
      username,
      sortOption,
      order as string
    );
    return res.status(200).json({ orders, deliveries, potentialRequests });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
