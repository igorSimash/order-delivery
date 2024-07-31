"use client";

import { useAppSelector } from "@/lib/redux/store";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { hasCookie, deleteCookie } from "cookies-next";
import { logIn, logOut } from "@/lib/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Header = () => {
  const router = useRouter();
  const { isAuth, username } = useAppSelector(
    (state) => state.authReducer.value
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (hasCookie("access_token")) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL as string}/user`, {
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) {
            deleteCookie("access_token");
            dispatch(logOut());
            return;
          }
          return res.json();
        })
        .then((res) => {
          dispatch(logIn(res.data.username));
        });
    }
  }, [dispatch]);

  const handleLogout = () => {
    deleteCookie("access_token");
    dispatch(logOut());
    router.push("/sign-in");
  };

  return (
    <header className="p-4">
      <div className="flex justify-end gap-2">
        {isAuth ? (
          <>
            <span className="italic">{username}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/sign-up" className="text-base">
              Sign Up
            </Link>
            <Link href="/sign-in" className="text-base">
              Sign In
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
