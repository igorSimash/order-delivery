export interface Order {
  id: number;
  user: string;
  city_from: string;
  city_to: string;
  type: string;
  date: string;
  description?: string;
}

export type OrderSimple = Omit<Order, "id" | "user">;
