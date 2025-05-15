import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Skeleton } from "@/components/ui/skeleton"
import Pagination from '@mui/material/Pagination';


interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[]
  data: TData[]
  page?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  onSortChange?: (column: string, order: "asc" | "desc") => void
  onSearch?: (query: string) => void
  isLoading?: boolean
}

export function DataTable<TData>({
  columns,
  data,
  page = 1,
  totalPages = 1,
  onPageChange = () => {},
  onSortChange = () => {},
  onSearch = () => {},
  isLoading
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true, 
    pageCount: totalPages,
  })

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        className="max-w-sm bg-white mt-3"
      />
  

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={() => {
                      const isAsc = header.column.getIsSorted() === "asc"
                      const order = isAsc ? "desc" : "asc"
                      onSortChange(header.column.id, order)
                    }}
                    className={`cursor-pointer ${
                      header.column.id === "actions" ? "sticky right-0 z-10 bg-white" : ""
                    } px-6`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc"
                      ? " 🔼"
                      : header.column.getIsSorted() === "desc"
                      ? " 🔽"
                      : ""}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (

              [...Array(1)].map((_, rowIndex) => (
                <TableRow key={`skeleton-row-${rowIndex}`}>
                  {columns.map((col, colIndex) => (
                    <TableCell
                      key={`skeleton-cell-${rowIndex}-${colIndex}`}
                      className={`px-2 ${col.id === "actions" ? "sticky right-0 z-6 bg-white" : ""}`}
                    >
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-6">
                  Data not found.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-gray-200 hover:font-medium">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`px-6 ${cell.column.id === "actions" ? "sticky right-0 z-10 bg-white" : ""}`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

       {/* Pagination */}
       <div className="mt-4 flex items-center justify-between">
        <span>
          Page {page} of {totalPages}
        </span>
            <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => onPageChange(value)}
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
          variant="outlined" 
        />
      </div>
    </div>  
  )
}
