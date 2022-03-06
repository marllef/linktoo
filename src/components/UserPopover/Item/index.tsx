import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const Item = ({ children, ...rest }: Props) => {
  return (
    <div
      className="select-none rounded cursor-pointer p-2 hover:bg-gray-100"
      {...rest}
    >
      {children}
    </div>
  );
};
