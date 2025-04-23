import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
    columns: number
    rows?: number
    hasStickyAction?: boolean
}

export function DataTableSkeleton({ columns, rows = 5, hasStickyAction = false }: Props) {
    return (
        <div className="rounded-md border bg-white">
        <Table>
            <TableHeader>
            <TableRow>
                {Array.from({ length: columns }).map((_, index) => (
                <TableHead
                    key={`header-${index}`}
                    className={`px-6 ${hasStickyAction && index === columns - 1 ? "sticky right-0 z-10 bg-white" : ""}`}
                >
                    <Skeleton className="h-4 w-24" />
                </TableHead>
                ))}
            </TableRow>
            </TableHeader>

            <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <TableRow key={`row-${rowIndex}`}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                    <TableCell
                    key={`cell-${rowIndex}-${colIndex}`}
                    className={`px-6 ${hasStickyAction && colIndex === columns - 1 ? "sticky right-0 z-10 bg-white" : ""}`}
                    >
                    <Skeleton className="h-4 w-full" />
                    </TableCell>
                ))}
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </div>
    )
    }
