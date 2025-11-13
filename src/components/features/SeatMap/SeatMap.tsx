"use client";
import React, { FC, useCallback, useMemo } from "react";
import { SeatPositionType } from "@/types";

interface SeatMapProps {
  rows: number;
  seatsPerRow: number;
  bookedSeats: SeatPositionType[];
  sessionId: number;
  readonly?: boolean;
  selected?: Set<string>;
  setSelected: (selected: Set<string>) => void;
}

const SeatMap: FC<SeatMapProps> = ({ rows, seatsPerRow, bookedSeats, readonly = false, selected = new Set(), setSelected }) => {
  const bookedSet = useMemo(() => new Set(bookedSeats.map((s: SeatPositionType) => `${s.rowNumber}-${s.seatNumber}`)), [bookedSeats]);

  const toggle = useCallback(
    (r: number, c: number) => {
      const key = `${r}-${c}`;
      if (bookedSet.has(key)) return;
      const next = new Set(selected);
      if (next.has(key)) next.delete(key); else next.add(key);
      setSelected(next);
    },
    [bookedSet, selected, setSelected]
  );

  return (
      <div className="flex justify-center">
        <div className="py-2 pr-2 flex flex-col gap-y-[4px] shrink-0">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="">
              <span>Ряд {rowIndex + 1}</span>
            </div>
          ))}
        </div>
        <div className="grid p-2 gap-x-[6.5px] gap-y-[4px] overflow-x-auto" style={{ gridTemplateColumns: `repeat(${seatsPerRow}, 1fr)` }}>
          {Array.from({ length: rows }).map((_, r) => (
            <React.Fragment key={r + 1}>
              {Array.from({ length: seatsPerRow }).map((_, c) => {
                const key = `${r + 1}-${c + 1}`;
                const isBooked = bookedSet.has(key);
                const isSelected = selected.has(key);
                return (
                  <div key={key} className="flex justify-center items-center">
                    <button
                      data-testid={`seat_${r + 1}_${c + 1}`}
                      aria-label={`Ряд ${r + 1}, место ${c + 1}`}
                      aria-pressed={isSelected}
                      className={`size-[20px] text-[14px] rounded-[5px] flex items-center justify-center border ${isBooked ? "bg-[#154163]" : isSelected ? "bg-[#B76969]" : ""}`}
                      onClick={() => !readonly && toggle(r + 1, c + 1)}
                      disabled={isBooked}>
                      {c + 1}
                    </button>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
  );
}

export default SeatMap;
