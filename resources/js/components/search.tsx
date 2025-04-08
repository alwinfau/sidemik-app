import { useState } from 'react';

type props = {
    onSearch? : any
}

const SearchName = ({ onSearch } : props) => {
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        if (onSearch) {
            onSearch(search);
        }
    };

    return (
        <div className='flex justify-end gap-2'>
            <input
                onChange={(e) => setSearch(e.target.value)}
                id="search"
                placeholder='Search...'
                className="w-[300px] border px-2 py-1 rounded"
            />
            <button 
                onClick={handleSearch} 
                className="bg-blue-500 text-white px-2.5 py-1 sm:px-2 sm:py-2  md:py rounded "
            >
                Search
            </button>
        </div>
    );
};

export default SearchName;
