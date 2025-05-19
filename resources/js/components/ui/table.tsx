import * as React from "react";
import { cn } from "@/lib/utils";

function Table({ className, children, ...props }: React.ComponentProps<"table">) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table data-slot="table" className={cn("w-full caption-bottom text-sm", className)} {...props}>
        {children}
      </table>
    </div>
  );
}

function TableHeader({ className, children, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead data-slot="table-header" className={cn("[&_tr]:border-b", className)} {...props}>
      {children}
    </thead>
  );
}

function TableBody({ className, children, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody data-slot="table-body" className={cn("[&_tr:last-child]:border-0", className)} {...props}>
      {children}
    </tbody>
  );
}

function TableRow({ className, children, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr data-slot="table-row" className={cn("hover:bg-muted/50 border-b transition-colors", className)} {...props}>
      {children}
    </tr>
  );
}

function TableHead({ className, children, ...props }: React.ComponentProps<"th">) {
  return (
    <th data-slot="table-head" className={cn("h-10 px-2 text-left font-medium", className)} {...props}>
      {children}
    </th>
  );
}

function TableCell({ className, children, ...props }: React.ComponentProps<"td">) {
  return (
    <td data-slot="table-cell" className={cn("p-2 align-middle", className)} {...props}>
      {children}
    </td>
  );
}

function TableCheckbox({ checked, onChange }: { checked: boolean, onChange: (checked: boolean) => void }) {
  return (
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="w-4 h-4" />
  );
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCheckbox };
