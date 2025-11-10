import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import SeatMap from "@/components/layout/SeatMap";
import { AvailableSeats, SeatPositionType } from "@/types";

describe("SeatMap component", () => {
    it("корректно рендерится", async () => {
        const seats: AvailableSeats = {
            rows: 5,
            seatsPerRow: 8,
        };
        const bookedSeats: SeatPositionType[] = [
            { rowNumber: 1, seatNumber: 1 },
            { rowNumber: 1, seatNumber: 2 },
        ];
        const readonly = false;
        render(<SeatMap seats={seats} bookedSeats={bookedSeats} readonly={readonly} sessionId={1} selected={new Set()} setSelected={(selected: Set<string>) => { }} />);

        await waitFor(() => expect(screen.getByTestId("seat_1_2")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByTestId("seat_1_6")).toBeInTheDocument());
    });

    it("переключает места в забронированное состояние и наоборот корректно", async () => {
        const seats: AvailableSeats = {
            rows: 5,
            seatsPerRow: 8,
        };
        const bookedSeats: SeatPositionType[] = [
            { rowNumber: 1, seatNumber: 1 },
            { rowNumber: 1, seatNumber: 2 },
        ];
        const readonly = false;
        const mockSelected = jest.fn().mockImplementation((value: React.SetStateAction<Set<string>>) => { });
        render(<SeatMap seats={seats} bookedSeats={bookedSeats} readonly={readonly} sessionId={1} selected={new Set(['1-4'])} setSelected={mockSelected} />);
    
        const button1 = await waitFor(() => screen.getByTestId("seat_1_4"));
        const button5 = await waitFor(() => screen.getByTestId("seat_1_6"));
    
        expect(button1).toHaveClass("bg-[#B76969]");
        expect(button5).not.toHaveClass("bg-[#B76969]");

    });

    it("переключает места в забронированное состояние и наоборот корректно", async () => {
        const seats: AvailableSeats = {
            rows: 5,
            seatsPerRow: 8,
        };
        const bookedSeats: SeatPositionType[] = [
            { rowNumber: 1, seatNumber: 1 },
            { rowNumber: 1, seatNumber: 2 },
        ];
        const readonly = false;
        const mockSelected = jest.fn().mockImplementation((value: React.SetStateAction<Set<string>>) => { });
        const { container } = render(<SeatMap seats={seats} bookedSeats={bookedSeats} readonly={readonly} sessionId={1} selected={new Set(['1-4'])} setSelected={mockSelected} />);
        expect(container).toMatchSnapshot();
    });
});
