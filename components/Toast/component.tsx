import { FC, useState, useEffect } from "react";
import clsx from "clsx";

interface ToastProps {
  content: ToastOpt | {};
  noMultiple?: boolean;
  timeout?: number;
}

interface List extends ToastOpt {
  id: string;
  isOpen: boolean;
}

export const Toast: FC<ToastProps> = (props): JSX.Element => {
  const { content, timeout = 3000, noMultiple = false } = props;
  const [list, setList] = useState<List[]>([] as List[]);

  useEffect(() => {
    const newToast = { ...content, isOpen: true, id: Date.now().toString() } as List;
    if (Object.keys(content).length) {
      if (noMultiple) setList([newToast]);
      else if (list.length > 1) {
        closeToast(list[0].id);
        setTimeout(() => setList([...list, newToast]), 300);
      }
      else setList([...list, newToast]);
    }
  // eslint-disable-next-line
  }, [content]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (list.length) closeToast(list[0].id);
    }, timeout);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [list, timeout, content]);

  const closeToast = (id: string) => {
    const index = list.findIndex((item) => item.id === id);
    setList(list.map((item) => {
      if (item.id === id) return { ...item, isOpen: false };
      return item;
    }))
    setTimeout(() => {
      list.splice(index, 1);
      setList([...list]);
    }, 300);
  };

  const iconType = (type: string) => {
    switch (type) {
      case "success":
        return "checkmark";
      case "warning":
        return "alert";
      case "error":
        return "close";
      default:
        return "information";
    }
  }

  return (
    <div className="fixed select-none space-y-2 w-11/12 md:w-[21rem] z-[9999] -translate-x-1/2 left-1/2 bottom-5 md:bottom-auto md:top-8">
      {list.map((toast) => (
        <div
          key={toast.id}
          className={clsx(
            "p-3 rounded-2xl w-full transition-all duration-300 animate-slideInUp md:animate-slideInDown",
            toast.type === "error"
              ? "bg-red-200 dark:bg-red-300 text-red-800"
              : toast.type === "success"
              ? "bg-green-200 dark:bg-green-300 text-green-800"
              : toast.type === "info"
              ? "bg-blue-200 dark:bg-[#81D4FA] text-[#01579B]"
              : toast.type === "warning"
              ? "bg-yellow-200 dark:bg-[#FFF59D] text-yellow-800"
              : "border bg-white dark:bg-black text-neutral-800 dark:text-neutral-200 dark:border-neutral-700",
            !toast.isOpen && "-bottom-0 translate-y-full md:bottom-auto md:top-0 md:-translate-y-full opacity-30"
          )}
          onClick={() => closeToast(toast.id)}
        >
          <div className="relative flex space-x-3">
            <div className="flex">
              {/* @ts-ignore */}
              <ion-icon
                name={`${iconType(toast.type || "")}-circle-outline`}
                style={{ fontSize: "24px", alignSelf: "center" }}
              />
            </div>
            <div className="flex flex-col self-center">
              <h1 className="font-bold">{toast.title}</h1>
              <p className="text-sm">{toast.message}</p>
            </div>
            <div
              className="absolute right-0 cursor-pointer max-h-2"
              onClick={() => closeToast(toast.id)}
            >
              {/* @ts-ignore */}
              {toast.title && <ion-icon name="close" style={{ fontSize: "20px" }} />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
