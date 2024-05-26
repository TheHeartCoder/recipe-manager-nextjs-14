import RecipeList from '@/app/components/RecipeList';
import SearchZone from '@/app/components/SearchZone';
import React, { FC } from 'react';

const MySavedRecipes: FC<{
    searchParams: {
        page: number;
        limit: number;
        category: string;
        searchText: string;
        sortBy: string;
    };
}> = ({ searchParams }) => {
    return (
        <main className='container mx-auto py-8 px-6'>
            <SearchZone
                path={'/recipes/my/saved'}
                searchValue={searchParams.searchText}
                sortValue={searchParams.sortBy}
            />
            {/* <RecipeList recipes={[]}  path={'/recipes/my/saved'} /> */}
        </main>
    );
};

export default MySavedRecipes;
