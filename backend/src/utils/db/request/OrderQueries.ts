import { getDatabaseConnector as db } from "../../../configs/db-injector";
import { Order, OrderSimple } from "../../../types/Order";
import { getUserData } from "../user/UserQueries";

export const getOrdersByUser = async (
  username: string,
  sortBy = "id",
  order = "asc"
) => {
  const today = new Date();
  today.setDate(today.getDate() - 1);

  return db()("order")
    .select(
      "order.id",
      "username",
      "city_from",
      "city_to",
      "description",
      "type",
      "date"
    )
    .join("user", { "order.user_id": "user.id" })
    .where({ "user.username": username })
    .andWhere("date", ">", today)
    .orderBy(sortBy, order);
};

export const getOrderById = async (id: number) => {
  return db()("order")
    .select(
      "order.id",
      "username",
      "city_from",
      "city_to",
      "description",
      "type",
      "date"
    )
    .where({ "order.id": id })
    .join("user", { "order.user_id": "user.id" })
    .first();
};

export const addOrder = async (data: OrderSimple, username: string) => {
  const user_id = (await getUserData(username))!.id;

  await db()("order").insert({
    user_id,
    ...data,
  });
};

export const updateOrder = async (data: Order, id: number) => {
  await db()("order").where({ id }).update(data);
};

export const deleteOrder = async (id: number) => {
  await db()("order").where({ id }).del();
};
