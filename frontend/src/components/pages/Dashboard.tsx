"use client";

import { useAppSelector } from "@/lib/redux/store";
import { useEffect } from "react";
import { setAllRequests, setPending } from "@/lib/redux/features/requestsSlice";
import { useDispatch } from "react-redux";
import { logOut } from "@/lib/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { OrderSection } from "../ui/section/requests/OrderSection";
import { DeliverySection } from "../ui/section/requests/DeliverySection";
import { SuggestedRequestSection } from "../ui/section/requests/SuggestedRequestSection";

export function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const refresh = useAppSelector((state) => state.requestsReducer.refresh);

  useEffect(() => {
    dispatch(setPending());
    fetch(process.env.NEXT_PUBLIC_API_URL + "/requests", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          dispatch(logOut());
          deleteCookie("access_token");
          router.push("/sign-in");
        }

        return res.json();
      })
      .then((res) => dispatch(setAllRequests(res)));
  }, [dispatch, refresh, router]);

  return (
    <div className="grid gap-6 md:gap-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <OrderSection />
        <DeliverySection />
        <SuggestedRequestSection />
      </div>
    </div>
  );
}
