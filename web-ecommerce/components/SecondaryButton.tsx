import React from "react";

interface SecondaryButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

function SecondaryButton({
    children,
    className = "",
    ...props
}: SecondaryButtonProps) {
    return (
        <button {...props} className={`transition-all duration-200 font-medium rounded-md text-sm px-5 py-2.5 text-center cursor-pointer border-1 ${className}`}>
            {children}
        </button>
    );
}

export default SecondaryButton;
