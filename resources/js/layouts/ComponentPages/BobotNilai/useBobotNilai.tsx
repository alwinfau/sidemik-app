import { useAxios } from "@/hooks/useAxios";
import { useState } from "react";
import { BobotNilaiType } from "./Column";

export const useBobotNilai = () =>{
    const { get, post, put, del } = useAxios();
    const [data, setData] = useState<BobotNilaiType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);


const fetchData = async (currentPage = 1) => {
        try {
            setIsLoading(true);
            const res: any = await get(`academic-year?page=${currentPage}&limit=10`);
            setData(res.data.data);
            setPage(res.data.current_page);
            setTotalPages(res.data.last_page);
        } catch (err) {
            setToast({ message: 'Failed to get Academic Year', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };
}