import { render, screen } from "@testing-library/react";
import { CinemaType } from "@/types";
import CinemaListItem from "@/components/CinemaListItem";

describe("CinemaListItem component", () => {
    it("рендерится корректно", () => {
        const data: CinemaType = {
            id: 1,
            name: "Cinema XXI",
            address: "Address"
        };
        render(<CinemaListItem data={data} />);
        expect(screen.getByText("Cinema XXI")).toBeInTheDocument();
        expect(screen.getByText("Address")).toBeInTheDocument();
        expect(screen.getByText("Просмотреть сеансы")).toBeInTheDocument();
    });

    it("рендерится с кастомным классом", () => {
        const data: CinemaType = {
            id: 1,
            name: "Cinema XXI",
            address: "Address"
        };
        const cellClassName = "cell-class";
        render(<CinemaListItem data={data} cellClassName={cellClassName} />);
        expect(screen.getByText("Cinema XXI")).toHaveClass(cellClassName);
        expect(screen.getByText("Address")).toHaveClass(cellClassName);
    });
});
