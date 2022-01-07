type Variant = "default" | "outline" | "flat";
type ColorScheme = "primary" | "danger" | "warning" | "success" | "info";

type ToastOpt = {
  message: string;
  title?: string;
  type?: "info" | "warning" | "success" | "error" | "default";
  Icon?: JSX.Element;
};