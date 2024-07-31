import { getDatabaseConnector as db } from "../../../configs/db-injector";
export const getOrdersWithDeliveries = async (
  username: string,
  sortBy = "id",
  order = "asc"
) => {
  const today = new Date();
  today.setDate(today.getDate() - 1);

  return await db()("order as o")
    .select(
      "o.id as order_id",
      "d.id as delivery_id",
      "u1.username as order_user",
      "u2.username as delivery_user",
      "o.city_from",
      "o.city_to",
      "o.type",
      "o.date",
      "o.description",
      db().raw("CONCAT(o.id, '_', d.id) as \"id\"")
    )
    .join("delivery as d", {
      "d.date": "o.date",
      "d.city_from": "o.city_from",
      "d.city_to": "o.city_to",
    })
    .join("user as u1", { "o.user_id": "u1.id" })
    .join("user as u2", { "d.user_id": "u2.id" })
    .where((t) =>
      t.where({ "u1.username": username }).orWhere({ "u2.username": username })
    )
    .andWhere("o.date", ">", today)
    .orderBy(`o.${sortBy}`, order);
};
