export interface Delivery {
  id: number;
  user: string;
  cityFrom: string;
  cityTo: string;
  date: Date;
}

export type DeliverySimple = Omit<Delivery, "id" | "user">;
