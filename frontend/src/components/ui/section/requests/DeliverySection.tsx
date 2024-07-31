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
import { sortRequestGroup } from "@/lib/redux/features/requestsSlice";
import { useDispatch } from "react-redux";
import { createContext, useState } from "react";
import { Modal } from "../../modal/Modal";
import { OrderDelivery } from "../../modal/modal-sections/DeliveryModal";

export const ModalContext = createContext<{
  chosenDelivery: number | null;
  setChosenDelivery: any;
}>({ chosenDelivery: null, setChosenDelivery: () => {} });

export const DeliverySection = () => {
  const dispatch = useDispatch();
  const deliveries = useAppSelector(
    (state) => state.requestsReducer.requests.deliveries
  );
  const sortOption = useAppSelector(
    (state) => state.requestsReducer.sortOptions.deliveries
  );
  const [chosenDelivery, setChosenDelivery] = useState<number | null>(null);

  const handleSort = () => {
    dispatch(
      sortRequestGroup({
        requestGroup: "deliveries",
        sortBy: sortOption === "id" ? "date" : "id",
      })
    );
  };

  return (
    <ModalContext.Provider value={{ chosenDelivery, setChosenDelivery }}>
      <Card className="col-span-2 lg:col-span-1">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Your Deliveries</CardTitle>
            <Button size={"sm"} variant={"link"} onClick={handleSort}>
              Sort by {sortOption === "id" ? "delivery date" : "creation date"}
            </Button>
          </div>

          <CardDescription>
            View and manage your recent deliveries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>City From</TableHead>
                <TableHead>City To</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveries &&
                deliveries.map((el) => (
                  <TableRow
                    key={el.id}
                    className="cursor-pointer"
                    onClick={() => setChosenDelivery(el.id)}
                  >
                    <TableCell>{el.city_from}</TableCell>
                    <TableCell>{el.city_to}</TableCell>
                    <TableCell>{formatDate(el.date)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {chosenDelivery && (
        <Modal open={!!chosenDelivery} onClose={() => setChosenDelivery(null)}>
          <OrderDelivery />
        </Modal>
      )}
    </ModalContext.Provider>
  );
};
