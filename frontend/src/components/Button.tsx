import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    disabled = false,
    type = "button",
    className,
}) => {
    const buttonClassName = `font-semibold bg-black text-white my-5 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-black ${className}`;

    return (
        <button
            className={buttonClassName}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;
