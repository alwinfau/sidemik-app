import { useState } from 'react';

const SearchName = ({ onSearch }) => {
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        if (onSearch) {
            onSearch(search);
        }
    };

    return (
        <div className="flex justify-end gap-2">
            <label htmlFor="search"></label>
            <input onChange={(e) => setSearch(e.target.value)} id="search" placeholder="Search..." className="w-[300px] rounded border px-2 py-2" />
            <button onClick={handleSearch} className="rounded bg-blue-500 px-2 py-2 text-white">
                Search
            </button>
        </div>
    );
};

export default SearchName;
