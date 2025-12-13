import React from "react";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function PrimaryButton({
  children,
  className = "",
  ...props
}: PrimaryButtonProps) {
  return (
    <button {...props} className={`text-black bg-[#A7E399] hover:bg-[#84994F] transition-all duration-200 font-medium rounded-md text-sm px-5 py-2.5 text-center cursor-pointer border-emerald-800 border-1 ${className}`}>
      {children}
    </button>
  );
}

export default PrimaryButton;
