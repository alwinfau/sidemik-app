import { useState } from 'react';

const FilterStatus = () => {
    const [selectedStatus, setSelectedStatus] = useState('');

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    return (
        <div className="bg-transparant flex items-center gap-4 rounded-lg p-4">
            <label className="text-white-900 font-medium">Filter Status:</label>
            <select
                className="rounded-lg border bg-white p-2 text-black focus:ring focus:ring-blue-300"
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
