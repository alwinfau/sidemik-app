import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type YearPickerProps = {
  startYear?: number;
  endYear?: number;
  value?: number;
  onSelect?: (year: number) => void;
};

const getYears = (start: number, end: number) => {
  const years = [];
  for (let year = start; year <= end; year++) {
    years.push(year);
  }
  return years;
};

const YearPicker = ({ startYear = 2000, endYear = new Date().getFullYear(), value, onSelect }: YearPickerProps) => {
  // Pastikan state memiliki nilai default yang valid
  const [selectedYear, setSelectedYear] = useState<number>(value ?? new Date().getFullYear());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Validasi: Hanya set jika value berupa angka dan dalam rentang yang benar
    if (typeof value === "number" && value >= startYear && value <= endYear) {
      setSelectedYear(value);
    }
  }, [value, startYear, endYear]);

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setIsOpen(false);
    if (onSelect) onSelect(year);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-32 justify-between">
          {selectedYear} <span className="ml-2">📅</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 max-w-xs">
        <div className="grid grid-cols-4 gap-2">
          {getYears(startYear, endYear).map((year) => (
            <Button
              key={year}
              variant={year === selectedYear ? "default" : "ghost"}
              className="w-16 h-10 text-sm"
              onClick={() => handleYearSelect(year)}
            >
              {year}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default YearPicker;
