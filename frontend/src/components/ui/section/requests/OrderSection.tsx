import { formatDate } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../card/Card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../table/Table";
import { useAppSelector } from "@/lib/redux/store";
import { Button } from "../../button/Button";
import { useDispatch } from "react-redux";
import { sortRequestGroup } from "@/lib/redux/features/requestsSlice";
import { createContext, useState } from "react";
import { Modal } from "../../modal/Modal";
import { OrderModal } from "../../modal/modal-sections/OrderModal";

export const ModalContext = createContext<{
  chosenOrder: number | null;
  setChosenOrder: any;
}>({ chosenOrder: null, setChosenOrder: () => {} });

export const OrderSection = () => {
  const dispatch = useDispatch();
  const orders = useAppSelector(
    (state) => state.requestsReducer.requests.orders
  );
  const sortOption = useAppSelector(
    (state) => state.requestsReducer.sortOptions.orders
  );
  const [chosenOrder, setChosenOrder] = useState<number | null>(null);
  const handleSort = () => {
    dispatch(
      sortRequestGroup({
        requestGroup: "orders",
        sortBy: sortOption === "id" ? "date" : "id",
      })
    );
  };
  return (
    <ModalContext.Provider value={{ chosenOrder, setChosenOrder }}>
      <Card className="col-span-2 lg:col-span-1">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Your Orders</CardTitle>
            <Button size={"sm"} variant={"link"} onClick={handleSort}>
              Sort by {sortOption === "id" ? "delivery date" : "creation date"}
            </Button>
          </div>
          <CardDescription>View and manage your recent orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>City From</TableHead>
                <TableHead>City To</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders &&
                orders.map((el) => (
                  <TableRow
                    key={el.id}
                    className="cursor-pointer"
                    onClick={() => setChosenOrder(el.id)}
                  >
                    <TableCell>{el.type}</TableCell>
                    <TableCell>{el.city_from}</TableCell>
                    <TableCell>{el.city_to}</TableCell>
                    <TableCell>{formatDate(el.date)}</TableCell>
                    <TableCell>{el.description}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {chosenOrder && (
        <Modal open={!!chosenOrder} onClose={() => setChosenOrder(null)}>
          <OrderModal />
        </Modal>
      )}
    </ModalContext.Provider>
  );
};
