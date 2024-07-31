import { formatDate } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../card/Card";
import { useAppSelector } from "@/lib/redux/store";
import { Button } from "../../button/Button";
import { createContext, useState } from "react";
import { Modal } from "../../modal/Modal";
import { SuggestedRequestModal } from "../../modal/modal-sections/SuggestedRequestModal";

export const ModalContext = createContext<{
  chosenRequest: string | null;
  setChosenRequest: any;
}>({ chosenRequest: null, setChosenRequest: () => {} });

export const SuggestedRequestSection = () => {
  const suggestedRequests = useAppSelector(
    (state) => state.requestsReducer.requests.potentialRequests
  );
  const [chosenRequest, setChosenRequest] = useState<string | null>(null);

  const user = useAppSelector((state) => state.authReducer.value.username);
  return (
    <ModalContext.Provider value={{ chosenRequest, setChosenRequest }}>
      <Card className="col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle>Suggested Requests</CardTitle>
          <CardDescription>
            View and respond to suggested orders and deliveries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {suggestedRequests &&
              suggestedRequests.map((el) => (
                <div className="grid gap-2" key={el.id}>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">
                      {el.order_user === el.delivery_user ? (
                        <span className="font-bold">Self delivery</span>
                      ) : el.order_user === user ? (
                        <span className="font-bold">Your order</span>
                      ) : (
                        <span className="font-bold">Your delivery</span>
                      )}{" "}
                      from {el.city_from} to {el.city_to}
                    </div>
                    <Button size="sm" onClick={() => setChosenRequest(el.id)}>
                      Info
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {el.type}, {formatDate(el.date)}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
      <Modal open={!!chosenRequest} onClose={() => setChosenRequest(null)}>
        <SuggestedRequestModal />
      </Modal>
    </ModalContext.Provider>
  );
};
