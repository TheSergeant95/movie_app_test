"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    type?: string;
    name?: string;
    text?: string;
    props?: any
}

const Input: React.FC<InputProps> = ({ className, type, name, text, ...props }) => {
    return (
        <>
            <label htmlFor={name} className="text-xs mb-1">{text}</label>
            <input id={name} type={type} name={name} className={`bg-transparent text-[12px] mb-2 p-[10px] leading-none border border-white ${className}`} {...props} />
        </>    
    );
}

export default Input;