import { useAppSelector } from "@/lib/redux/store";
import { useContext } from "react";
import { ModalContext } from "../../section/requests/SuggestedRequestSection";
import { formatDate } from "@/lib/utils";

export const SuggestedRequestModal = () => {
  const { chosenRequest, setChosenRequest } = useContext(ModalContext);
  const request = useAppSelector((state) =>
    state.requestsReducer.requests.potentialRequests.find(
      (el) => el.id === chosenRequest
    )
  );
  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-8">
      <div className="grid grid-cols-2 gap-6 sm:gap-8">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Order User
          </h3>
          <div className="text-base font-medium">{request?.order_user}</div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Delivery User
          </h3>
          <div className="text-base font-medium">{request?.delivery_user}</div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            City From
          </h3>
          <div className="text-base font-medium">{request?.city_from}</div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">City To</h3>
          <div className="text-base font-medium">{request?.city_to}</div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Order Type
          </h3>
          <div className="text-base font-medium">{request?.type}</div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
          <div className="text-base font-medium">
            {formatDate(request?.date as string)}
          </div>
        </div>
        <div className="col-span-2 space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Description
          </h3>
          <div className="text-base font-medium">{request?.description}</div>
        </div>
      </div>
    </div>
  );
};
