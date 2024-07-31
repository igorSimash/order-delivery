"use server";

import { z } from "zod";

const schemaAuth = z.object({
  username: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, {
      message: "Identifier must have at least 3 or more characters",
    })
    .max(20, {
      message: "Please enter a valid username or email address",
    }),
  password: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(6, {
      message: "Password must have at least 6 or more characters",
    })
    .max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
});

export async function validateAuthAction(formData: FormData) {
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const validatedFields = schemaAuth.safeParse(data);

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
