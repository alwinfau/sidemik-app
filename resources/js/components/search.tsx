import { useState } from 'react';

type props = {
    onSearch?: any;
};

const SearchName = ({ onSearch }: props) => {
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        if (onSearch) {
            onSearch(search);
        }
    };

    return (
        <div className="flex justify-end gap-2">
            <input onChange={(e) => setSearch(e.target.value)} id="search" placeholder="Search..." className="w-[300px] rounded border px-2 py-1" />
            <button onClick={handleSearch} className="md:py rounded bg-blue-500 px-2.5 py-1 text-white sm:px-2 sm:py-2">
                Search
            </button>
        </div>
    );
};

export default SearchName;
