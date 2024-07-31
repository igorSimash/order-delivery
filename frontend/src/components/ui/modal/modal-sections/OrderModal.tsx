"use client";

import { FormEvent, useContext, useState } from "react";
import { Button } from "../../button/Button";
import { Input } from "../../input/Input";
import { Label } from "../../label/Label";
import { useAppSelector } from "@/lib/redux/store";
import { formatDate } from "@/lib/utils";
import { validateOrderAction } from "@/lib/zod/requestsAction";
import { ModalContext } from "../../section/requests/OrderSection";
import { refreshRequests } from "@/lib/redux/features/requestsSlice";
import { useDispatch } from "react-redux";

export const OrderModal = () => {
  const dispatch = useDispatch();
  const { chosenOrder, setChosenOrder } = useContext(ModalContext);
  const order = useAppSelector(
    (state) => state.requestsReducer.requests.orders
  ).find((el) => el.id === chosenOrder)!;
  const [error, setError] = useState<string | null>(null);

  const handleEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const validatedData = await validateOrderAction(formData);

    if (validatedData.error) {
      setError(validatedData.message as string);
      return;
    }

    const data = validatedData.data;

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL as string
      }/requests/order/${chosenOrder}`,
      {
        credentials: "include",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, username: order.user }),
      }
    );
    if (response.ok) {
      setChosenOrder(null);
      dispatch(refreshRequests());
    } else {
      const errorMessage = (await response.json()).message;
      setError(errorMessage);
    }
  };

  const handleDelete = async () => {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL as string
      }/requests/order/${chosenOrder}`,
      {
        credentials: "include",
        method: "DELETE",
      }
    );
    if (response.ok) {
      setChosenOrder(null);
      dispatch(refreshRequests());
    } else {
      const errorMessage = (await response.json()).message;
      setError(errorMessage);
    }
  };

  return (
    <form
      className="bg-[white] rounded-lg shadow-md w-full max-w-md p-6 space-y-4"
      onSubmit={handleEdit}
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Edit the order</h2>
      </div>
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="space-y-2">
            <Label htmlFor="cityFrom">City From</Label>
            <Input
              id="cityFrom"
              type="text"
              name="cityFrom"
              placeholder="From"
              defaultValue={order.city_from}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cityTo">City To</Label>
            <Input
              id="cityTo"
              type="text"
              name="cityTo"
              placeholder="To"
              defaultValue={order.city_to}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Order Type</Label>
            <Input
              id="type"
              type="text"
              name="type"
              placeholder="Type"
              defaultValue={order.type}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Order Date</Label>
            <input
              type="date"
              name="date"
              id="date"
              className="outline-none py-1.5 w-full rounded-md border border-input bg-background"
              defaultValue={order.date && formatDate(order.date)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="repeat-password">Order Description</Label>
          <Input
            id="description"
            type="text"
            name="description"
            placeholder="Description"
            defaultValue={order.description}
          />
        </div>
      </div>
      {error && <p className="text-[red] text-sm">{error}</p>}
      <div className="flex gap-3 justify-between items-center">
        <Button
          className="w-full"
          variant={"destructive"}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button type="submit" className="w-full">
          Edit
        </Button>
      </div>
    </form>
  );
};
