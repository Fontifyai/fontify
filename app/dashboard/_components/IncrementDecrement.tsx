"use client";

import { motion } from "framer-motion";
import { Minus, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IncrementDecrementProps {
  value: number;
  onChange: (value: number) => void;
}

export function IncrementDecrement({
  value,
  onChange,
}: IncrementDecrementProps) {
  const handleChange = (increment: number) => {
    const newValue = value + increment;
    if (newValue >= 1 && newValue <= 5) {
      onChange(newValue);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-md">
            <Sparkles className="h-5 w-5" />
          </div>
          {/* <span className="text-sm font-medium">Personality</span> */}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-white"
            onClick={() => handleChange(-1)}
            disabled={value <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-4 text-center">{value}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-white"
            onClick={() => handleChange(1)}
            disabled={value >= 5}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
