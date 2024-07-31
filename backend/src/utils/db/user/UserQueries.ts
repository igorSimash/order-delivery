import { getDatabaseConnector as db } from "../../../configs/db-injector";
import { User } from "../../../types/User";

export const getUserData = async (
  username: string
): Promise<User | undefined> => {
  const el = await db()("user").select().where({ username }).first();
  return el;
};

export const addUser = async (username: string, password_hash: string) => {
  await db()("user").insert({ username, password_hash });
};
