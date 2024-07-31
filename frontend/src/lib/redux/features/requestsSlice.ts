import { Delivery, Order, Request } from "@/types/RequestsTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type sortedByOptions = "id" | "date";
type requestGroups = "orders" | "deliveries";
interface RequestsState {
  orders: Order[];
  deliveries: Delivery[];
  potentialRequests: Request[];
}

interface SortOptions {
  orders: sortedByOptions;
  deliveries: sortedByOptions;
  potentialRequests: sortedByOptions;
}

interface InitialState {
  requests: RequestsState;
  pending: boolean;
  refresh: boolean;
  sortOptions: SortOptions;
}

const initialState = {
  pending: false,
  refresh: false,
  requests: {
    orders: [],
    deliveries: [],
    potentialRequests: [],
  },
  sortOptions: {
    orders: "id",
    deliveries: "id",
    potentialRequests: "id",
  },
} as InitialState;

export const requests = createSlice({
  name: "request",
  initialState,
  reducers: {
    setPending: (state) => {
      return {
        ...state,
        pending: true,
      };
    },
    setAllRequests: (state, action: PayloadAction<RequestsState>) => {
      return {
        ...state,
        pending: false,
        requests: action.payload,
      };
    },
    sortRequestGroup: (
      state,
      action: PayloadAction<{
        requestGroup: requestGroups;
        sortBy: sortedByOptions;
      }>
    ) => {
      const sortOption = action.payload.sortBy;
      const requestGroup = action.payload.requestGroup;

      const result = [...state.requests[requestGroup]].sort((a, b) => {
        if (sortOption === "date")
          return new Date(a.date).getTime() - new Date(b.date).getTime();

        return a.id - b.id;
      });

      return {
        ...state,
        sortOptions: {
          ...state.sortOptions,
          [requestGroup]: sortOption,
        },
        requests: {
          ...state.requests,
          [requestGroup]: result,
        },
      };
    },
    refreshRequests: (state) => {
      return {
        ...state,
        refresh: !state.refresh,
      };
    },
  },
});

export const { setAllRequests, setPending, sortRequestGroup, refreshRequests } =
  requests.actions;
export default requests.reducer;
