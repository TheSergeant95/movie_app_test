import { FC } from "react";

const SubtitleBlock: FC<{ children?: React.ReactNode }> = ({ children }: { children?: React.ReactNode }) => {
    return (
        <h2 className="p-2 text-center mt-[43px] mb-[10px] text-2xl">{children || ''}</h2>
    )
}

export default SubtitleBlock;