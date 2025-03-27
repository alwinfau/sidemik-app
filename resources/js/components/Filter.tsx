import React, { useState } from "react";

const FilterStatus = () => {
    const [selectedStatus, setSelectedStatus] = useState("");

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    return (
        <div className="flex items-center gap-4 bg-transparant p-4 rounded-lg">
            <label className="text-white font-medium">Filter Status:</label>
            <select
                className="border rounded-lg p-2 focus:ring focus:ring-blue-300 bg-white text-black"
                value={selectedStatus}
                onChange={handleStatusChange} 
            >
                <option value="">Semua</option>
                <option value="AKTIF">Aktif</option>
                <option value="NON_AKTIF">Non-Aktif</option>
            </select>
        </div>
    );
};

export default FilterStatus;
