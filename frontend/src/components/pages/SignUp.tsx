"use client";
import { Label } from "@/components/ui/label/Label";
import { Input } from "@/components/ui/input/Input";
import { Button } from "@/components/ui/button/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { setCookie } from "cookies-next";
import { validateAuthAction } from "@/lib/zod/authAction";
import { useDispatch } from "react-redux";
import { logIn } from "@/lib/redux/features/authSlice";

export function SignUp() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const validatedData = await validateAuthAction(formData);

    if (validatedData.error) {
      setError(validatedData.message as string);
      return;
    }

    const { username, password } = validatedData.data!;

    if (password !== formData.get("repeat-password")) {
      setError("Passwords are not equal");
      return;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL as string}/user/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    if (response.ok) {
      const token = (await response.json()).token;
      setCookie("access_token", token, {
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
      });
      dispatch(logIn(username as string));

      router.push("/dashboard");
    } else {
      const errorMessage = (await response.json()).message;
      setError(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white rounded-lg shadow-md w-full max-w-md p-6 space-y-3"
        onSubmit={handleSubmit}
      >
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Sign Up</h2>
          <p className="text-muted-foreground">Create a new account</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="repeat-password">Repeat Password</Label>
            <Input
              id="repeat-password"
              type="password"
              name="repeat-password"
              placeholder="Repeat your password"
            />
          </div>
        </div>
        {error && <p className="text-[red] text-sm">{error}</p>}
        <div className="flex justify-between items-center">
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium hover:underline"
            prefetch={false}
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
