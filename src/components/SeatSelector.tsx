'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SeatSelectorProps {
  totalSeats: number;
  availableSeats: number;
  selectedSeats: string[];
  onSeatToggle: (seatId: string) => void;
  maxSeats?: number;
}

export function SeatSelector({ 
  totalSeats, 
  availableSeats, 
  selectedSeats, 
  onSeatToggle,
  maxSeats = 4 
}: SeatSelectorProps) {
  // Mocking occupied seats (availableSeats is total available, so totalSeats - availableSeats are occupied)
  const occupiedCount = totalSeats - availableSeats;
  const occupiedSeats = Array.from({ length: occupiedCount }, (_, i) => `S${i + 1}`);

  const seats = Array.from({ length: totalSeats }, (_, i) => {
    const seatId = `S${i + 1}`;
    const isOccupied = occupiedSeats.includes(seatId);
    const isSelected = selectedSeats.includes(seatId);
    
    return { id: seatId, isOccupied, isSelected };
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-6 text-sm mb-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded border bg-white" />
          <span>Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded border bg-primary text-primary-foreground flex items-center justify-center text-[10px]">✓</div>
          <span>Sélectionné</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded border bg-zinc-200 dark:bg-zinc-800" />
          <span>Occupé</span>
        </div>
      </div>

      <div className="max-w-[300px] mx-auto bg-zinc-100 dark:bg-zinc-900 p-6 rounded-3xl border-2 border-zinc-200 dark:border-zinc-800 shadow-inner">
        {/* Bus Front */}
        <div className="w-full h-8 bg-zinc-300 dark:bg-zinc-700 rounded-t-lg mb-8 flex items-center justify-center text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          Avant du bus
        </div>

        <div className="grid grid-cols-4 gap-4">
          {seats.map((seat) => (
            <button
              key={seat.id}
              disabled={seat.isOccupied}
              onClick={() => onSeatToggle(seat.id)}
              className={cn(
                "h-10 w-10 rounded-lg border-2 text-xs font-bold transition-all flex items-center justify-center relative",
                seat.isOccupied 
                  ? "bg-zinc-200 border-zinc-300 text-zinc-400 cursor-not-allowed dark:bg-zinc-800 dark:border-zinc-700" 
                  : seat.isSelected
                    ? "bg-primary border-primary text-primary-foreground shadow-lg scale-110 z-10"
                    : "bg-white border-zinc-300 hover:border-primary text-zinc-600 dark:bg-zinc-950 dark:border-zinc-800"
              )}
            >
              {seat.id}
              {/* Armrests decoration */}
              <div className="absolute -left-1 top-2 bottom-2 w-1 bg-inherit border-l border-zinc-400/20 rounded-l-sm" />
              <div className="absolute -right-1 top-2 bottom-2 w-1 bg-inherit border-r border-zinc-400/20 rounded-r-sm" />
            </button>
          ))}
        </div>
      </div>
      
      <p className="text-center text-sm text-zinc-500">
        {selectedSeats.length > 0 
          ? `${selectedSeats.length} siège(s) sélectionné(s) : ${selectedSeats.join(', ')}`
          : `Sélectionnez jusqu'à ${maxSeats} sièges`}
      </p>
    </div>
  );
}
