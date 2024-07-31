export interface Order {
  id: number;
  user: string;
  city_from: string;
  city_to: string;
  type: string;
  date: string;
  description?: string;
}

export interface Delivery {
  id: number;
  user: string;
  city_from: string;
  city_to: string;
  date: string;
}

export interface Request {
  id: string;
  order_id: number;
  delivery_id: number;
  order_user: string;
  delivery_user: string;
  city_from: string;
  city_to: string;
  type: string;
  date: string;
  description: string;
}
