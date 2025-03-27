import { useState } from 'react';

const SearchName = ({ onSearch }) => {
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        if (onSearch) {
            onSearch(search);
        }
    };

    return (
        <div className='flex items-center gap-2'>
            <label htmlFor="search">Search</label>
            <input
                onChange={(e) => setSearch(e.target.value)}
                id="search"
                placeholder='Search...'
                className="w-[300px] border px-2 py-1 rounded"
            />
            <button 
                onClick={handleSearch} 
                className="bg-blue-500 text-white px-5 py-3 sm:px-2  md:py rounded "
            >
                Search
            </button>
        </div>
    );
};

export default SearchName;
