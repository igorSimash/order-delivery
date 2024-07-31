import { cn } from "@/lib/utils";
import React, { useRef } from "react";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  open?: boolean;
  onClose: () => void;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, ...props }, ref) => {
    const container = useRef<HTMLDivElement>(null);
    const onOverlayClick = (e: React.MouseEvent) => {
      if (!container.current?.contains(e.target as Node)) onClose();
    };
    return (
      <div
        className={cn(
          "fixed inset-0 p-8 text-white bg-[gray]/40 z-20",
          `${open ? "visible" : "invisible"}`
        )}
        onClick={onOverlayClick}
      >
        <div className="relative w-full max-w-sm mx-auto mt-8" ref={container}>
          <button
            className="absolute -right-0 flex justify-center rounded-full h-8 w-8 cursor-pointer"
            onClick={() => onClose()}
            title="Bye bye"
          >
            <span className="text-3xl leading-7 select-none">&times;</span>
          </button>
          <div
            className="overflow-hidden bg-[white] rounded-sm shadow-xl"
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";
