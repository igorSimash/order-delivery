import { getDatabaseConnector as db } from "../../../configs/db-injector";
import { Delivery, DeliverySimple } from "../../../types/Delivery";
import { getUserData } from "../user/UserQueries";

export const getDeliveriesByUser = async (
  username: string,
  sortBy = "id",
  order = "asc"
) => {
  const today = new Date();
  today.setDate(today.getDate() - 1);

  return db()("delivery")
    .select("delivery.id", "username", "city_from", "city_to", "date")
    .join("user", { "delivery.user_id": "user.id" })
    .where({ "user.username": username })
    .andWhere("date", ">", today)
    .orderBy(sortBy, order);
};

export const getDeliveryById = async (id: number) => {
  return db()("delivery")
    .select("delivery.id", "username", "city_from", "city_to", "date")
    .where({ "delivery.id": id })
    .join("user", { "delivery.user_id": "user.id" })
    .first();
};

export const addDelivery = async (data: DeliverySimple, username: string) => {
  const user_id = (await getUserData(username))!.id;

  await db()("delivery").insert({
    user_id,
    ...data,
  });
};

export const updateDelivery = async (data: Delivery, id: number) => {
  await db()("delivery").where({ id }).update(data);
};

export const deleteDelivery = async (id: number) => {
  await db()("delivery").where({ id }).del();
};
