import { FC, memo } from "react";

const Component: FC = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      style={{ color: "currentcolor" }}
    >
      <path d="M6 9l6 6 6-6"></path>
    </svg>
  );
};

export const Chevron = memo(Component);
