// PrimaryButton.tsx
import React, { FC, ReactNode, ButtonHTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "./PrimaryButton.css";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  icon?: IconProp;
  onClick?: () => void;
  children?: ReactNode;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({ children, icon, onClick, ...props }) => {
  return (
    <button className="primary-button" onClick={onClick} {...props}>
      {icon && <FontAwesomeIcon icon={icon} className="icon" />}
      {children}
    </button>
  );
};
