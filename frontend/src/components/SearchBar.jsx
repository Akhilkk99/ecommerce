import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Only show the search bar on specific pages like 'collection'
        setVisible(location.pathname.includes('collection'));
    }, [location]);

    const closeSearchBar = () => {
        setSearch(''); // Reset search input when closing
        setShowSearch(false);
    };

    return (
        showSearch && visible && (
            <div className='border-t border-b bg-gray-50 text-center'>
                <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='flex-1 outline-none bg-inherit text-sm'
                        type="text"
                        placeholder='Search'
                    />
                    <img className='w-4 ml-2 cursor-pointer' src={assets.search_icon} alt="search icon" />
                </div>
                <img
                    onClick={closeSearchBar}
                    className='inline w-3 cursor-pointer ml-2'
                    src={assets.cross_icon}
                    alt="close icon"
                />
            </div>
        )
    );
};

export default SearchBar;