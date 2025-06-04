import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  starticon?: ReactElement;
  onClick?: ()=>void
}

const variantStyle = {
  primary: "text-white bg-[#4643d3]",
  secondary: "text-[#4743d1]  bg-[#dce5fd]",
};

const defaultStyle = "px-4 py-2 rounded-md font-light cursor-pointer";

export function Button(props: ButtonProps) {
  return (
    <button onClick={props.onClick} className={variantStyle[props.variant] + " " + defaultStyle}>
      <div className="flex items-center gap-3">
        {props.starticon} {props.text}
      </div>
    </button>
  );
}
