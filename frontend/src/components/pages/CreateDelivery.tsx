"use client";

import Link from "next/link";
import { Button } from "../ui/button/Button";
import { Input } from "../ui/input/Input";
import { Label } from "../ui/label/Label";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { validateDeliveryAction } from "@/lib/zod/requestsAction";

export const CreateDelivery = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const validatedData = await validateDeliveryAction(formData);

    if (validatedData.error) {
      setError(validatedData.message as string);
      return;
    }
    const data = validatedData.data;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL as string}/requests/delivery`,
      {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) router.push("/dashboard");
    else {
      const errorMessage = (await response.json()).message;
      setError(errorMessage);
    }
  };
  return (
    <form
      className="bg-white rounded-lg shadow-md w-full max-w-md p-6 space-y-4"
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Create the Delivery</h2>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cityFrom">City From</Label>
          <Input id="cityFrom" type="text" name="cityFrom" placeholder="From" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cityTo">City To</Label>
          <Input id="cityTo" type="text" name="cityTo" placeholder="To" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Order Date</Label>
          <input
            type="date"
            name="date"
            id="date"
            className="outline-none py-1.5 w-full rounded-md border border-input bg-background"
          />
        </div>
      </div>
      {error && <p className="text-[red] text-sm">{error}</p>}
      <div className="flex justify-between items-center">
        <Button type="submit" className="w-full">
          Create
        </Button>
      </div>
      <div className="text-center text-sm text-muted-foreground">
        <Link
          href="/create"
          className="font-medium hover:underline"
          prefetch={false}
        >
          Go Back
        </Link>
      </div>
    </form>
  );
};
