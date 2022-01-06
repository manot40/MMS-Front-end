import { FC, useState, useEffect } from "react";
import clsx from "clsx";

type ToastProps = {
  message?: string;
  title?: string;
  type?: "info" | "warning" | "success" | "error" | "default";
  timeout?: number;
  Icon?: JSX.Element;
  close: (arg: string) => void;
};

export const Toast: FC<ToastProps> = ({
  message,
  title,
  type = "default",
  timeout = 5000,
  Icon,
  close,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    message ? setIsOpen(true) : setIsOpen(false);
    const timer = setTimeout(() => {
      close("");
    }, timeout);

    return () => clearTimeout(timer);
  }, [message])

  return (
    <div
      className={clsx(
        "fixed select-none space-y-2 w-11/12 md:w-1/5 -translate-x-1/2 left-1/2 bottom-5 md:bottom-auto md:top-8 transition-all duration-300",
        !isOpen &&
          "-bottom-0 translate-y-full md:bottom-auto md:top-0 md:-translate-y-full"
      )}
    >
      <div className="bg-red-200 dark:bg-red-300 text-red-800 p-4 rounded-2xl w-full">
        <div className="relative flex">
          <div className="self-start mr-4 h-fit">
            {/* @ts-ignore */}
            <ion-icon
              name="close-circle-outline"
              style={{ fontSize: "18px" }}
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold">{title}</h1>
            <p className="text-sm">{message}</p>
          </div>
          <div
            className="absolute right-0 cursor-pointer"
            onClick={() => close("")}
          >
            {/* @ts-ignore */}
            <ion-icon name="close" style={{ fontSize: "18px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};
