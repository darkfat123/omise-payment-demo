import React from 'react';

interface PrimaryButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

function PrimaryButton({ onClick, children }: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
     className="text-black bg-[#A7E399] hover:bg-[#84994F] hover:rotate-3 transition-all duration-250 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 cursor-pointer"
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
 