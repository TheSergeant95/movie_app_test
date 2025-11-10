import React, { FC } from "react";

interface ContentBlockProps {
    children?: React.ReactNode;
    className?: string;
}
const ContentBlock: FC<ContentBlockProps> = ({ children, className }) => {
    return (
        <div className={`pr-[80px] overflow-y-auto w-full max-h-full ${className}`}>
            {children}
        </div>
    )
}

export default ContentBlock;