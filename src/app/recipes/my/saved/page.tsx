import { getSavedRecipes } from '@/app/action';
import RecipeList from '@/app/components/RecipeList';
import SearchZone from '@/app/components/SearchZone';
import { auth } from '@clerk/nextjs/server';
import React, { FC } from 'react';

const MySavedRecipes: FC<{
    searchParams: {
        page: number;
        limit: number;
        category: string;
        searchText: string;
        sortBy: string;
    };
}> = async ({ searchParams }) => {
    const { userId } = auth();
    const data = await getSavedRecipes({
        authorId: userId || '',
        ...searchParams
    });

    return (
        <main className='container mx-auto py-8 px-6'>
            <SearchZone
                path={'/recipes/my/saved'}
                searchValue={searchParams.searchText}
                sortValue={searchParams.sortBy}
            />
            <RecipeList
                recipes={data.recipes}
                currentPage={data.page}
                path={'/recipes/my/saved'}
                isSavedRecipe={true}
            />
        </main>
    );
};

export default MySavedRecipes;
