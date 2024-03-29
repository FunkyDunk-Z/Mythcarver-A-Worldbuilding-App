import { RefObject, ChangeEvent, MouseEvent } from "react";

import styles from "./css/MyButton.module.css";

type ButtonType = "button" | "submit" | "reset" | undefined;

type EventTypes = ChangeEvent | MouseEvent;

interface ButtonProps {
  children: React.ReactNode;
  handleClick?: (e?: EventTypes) => void;
  isDisabled?: boolean;
  theme?: string;
  type?: ButtonType;
  withRef?: RefObject<HTMLButtonElement>;
}

function MyButton({
  children,
  handleClick,
  isDisabled,
  theme,
  type,
  withRef,
}: ButtonProps) {
  const defaultTheme = !theme ? "" : theme;
  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`${styles[defaultTheme]}`}
      type={type}
      ref={withRef}
      role="button"
    >
      {children}
    </button>
  );
}

export default MyButton;
