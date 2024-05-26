'use client';
import React, { FC, useState } from 'react';
import { sortMethods } from '../constants/recipe.constants';
import { useRouter } from 'next/navigation';

const SearchZone: FC<{
    path?: string;
    sortValue?: string;
    searchValue?: string;
}> = ({ path, searchValue, sortValue }) => {
    const router = useRouter();
    const [searchText, setSearchText] = useState(searchValue || '');
    return (
        <div className='flex justify-between items-center mb-8'>
            <div className='flex items-center'>
                <div className='flex items-center'>
                    <input
                        type='text'
                        placeholder='Search by title'
                        className='py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mr-2'
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button
                        className='bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none'
                        onClick={(e) => {
                            if (searchText)
                                router.push(
                                    `${path || '/'}?searchText=${searchText}`
                                );
                            else router.push(path || '/');
                        }}
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className='flex items-center space-x-4'>
                <span className='text-lg font-semibold text-gray-800'>
                    Sort By:
                </span>
                <select
                    className='py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                    onChange={(e) => {
                        if (e.target.value)
                            router.push(
                                `${path || '/'}?sortBy=${e.target.value}`
                            );
                        else router.push(path || '/');
                    }}
                    defaultValue={sortValue || ''}
                >
                    <option value=''>Sort By</option>
                    {Object.entries(sortMethods).map(
                        ([methodName, methodValue]: any) => (
                            <option value={methodName} key={methodName}>
                                {methodValue.label}
                            </option>
                        )
                    )}
                </select>
            </div>
        </div>
    );
};

export default SearchZone;
