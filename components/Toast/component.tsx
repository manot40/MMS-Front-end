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
    if (content.message) {
      const newToast = { ...content, isOpen: true, id: Date.now().toString() } as List;
      if (noMultiple || list.length >= 3) setList([newToast]);
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

  return (
    <div className="fixed select-none space-y-2 w-11/12 md:w-[21rem] z=[9999] -translate-x-1/2 left-1/2 bottom-5 md:bottom-auto md:top-8">
      {list.map((toast) => (
        <div
          key={toast.id}
          className={clsx(
            "bg-red-200 dark:bg-red-300 text-red-800 p-4 rounded-2xl w-full transition-all duration-300 opacity-100 animate-slideInUp md:animate-slideInDown",
            !toast.isOpen && "-bottom-0 translate-y-full md:bottom-auto md:top-0 md:-translate-y-full opacity-20"
          )}
        >
          <div className="relative flex">
            <div className="self-start mr-4 h-fit">
              {/* @ts-ignore */}
              <ion-icon
                name="close-circle-outline"
                style={{ fontSize: "18px" }}
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold">{toast.title}</h1>
              <p className="text-sm">{toast.message}</p>
            </div>
            <div
              className="absolute right-0 cursor-pointer"
              onClick={() => closeToast(toast.id)}
            >
              {/* @ts-ignore */}
              <ion-icon name="close" style={{ fontSize: "18px" }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
