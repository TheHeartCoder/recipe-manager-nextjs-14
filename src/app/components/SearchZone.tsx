import React from 'react';

const SearchZone = () => {
    return (
        <div className='flex justify-between items-center mb-8'>
            <div className='flex items-center'>
                <div className='flex items-center'>
                    <input
                        type='text'
                        placeholder='Search by title'
                        className='py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mr-2'
                    />
                    <button className='bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none'>
                        Search
                    </button>
                </div>
            </div>
            <div className='flex items-center space-x-4'>
                <span className='text-lg font-semibold text-gray-800'>
                    Sort By:
                </span>
                <select className='py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'>
                    <option value='ratings'>Ratings</option>
                    <option value='likes'>Likes</option>
                    <option value='recent'>Recent Added</option>
                    <option value='cooking'>Cooking Time</option>
                </select>
            </div>
        </div>
    );
};

export default SearchZone;
