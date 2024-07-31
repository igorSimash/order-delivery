import { z } from "zod";
import { formatDate } from "../utils";

const schemaOrder = z.object({
  city_from: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(2, {
      message:
        "The city from which the order is sent must have at least 2 characters",
    }),
  city_to: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(2, {
      message:
        "The city to which the order is sent must have at least 2 characters",
    }),
  type: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(2, {
      message: "The type of order must have at least 2 characters",
    }),
  date: z
    .string()
    .date("The date is invalid")
    .refine((date) => {
      const today = new Date();
      today.setDate(today.getDate() - 1);
      return today < new Date(date);
    }, "The date must be at least today's or later"),
  description: z.string().optional(),
});

export async function validateOrderAction(formData: FormData) {
  const data = {
    city_from: formData.get("cityFrom"),
    city_to: formData.get("cityTo"),
    type: formData.get("type"),
    date: formatDate(formData.get("date") as string),
    description: formData.get("description"),
  };
  const validatedFields = schemaOrder.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: true,
      message: validatedFields.error.errors[0].message,
    };
  }

  return {
    error: false,
    data,
  };
}

const schemaDelivery = z.object({
  city_from: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(2, {
      message:
        "The city from which the order is sent must have at least 2 characters",
    }),
  city_to: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(2, {
      message:
        "The city to which the order is sent must have at least 2 characters",
    }),
  date: z
    .string()
    .date("The date is invalid")
    .refine((date) => {
      const today = new Date();
      today.setDate(today.getDate() - 1);
      return today < new Date(date);
    }, "The date must be at least today's or later"),
});

export async function validateDeliveryAction(formData: FormData) {
  const data = {
    city_from: formData.get("cityFrom"),
    city_to: formData.get("cityTo"),
    date: formatDate(formData.get("date") as string),
  };
  const validatedFields = schemaDelivery.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: true,
      message: validatedFields.error.errors[0].message,
    };
  }

  return {
    error: false,
    data,
  };
}
