import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type InputProps = {
  label: string;
  value: string | null;
  onChange: (date: string) => void;
};

export default function DatePickerYearsOrder({ label, value, onChange }: InputProps) {
  console.log("data", value)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value ? dayjs(value) : null}
        onChange={(newValue: Dayjs | null) => {
          if (newValue) {
            onChange(newValue.format('YYYY-MM-DD'));
          }
        }}
        slotProps={{
          textField: {
            fullWidth: true,
          },
        }}
      />
    </LocalizationProvider>
  );
}
