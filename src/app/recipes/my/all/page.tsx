import { getRecipes } from '@/app/action';
import RecipeList from '@/app/components/RecipeList';
import SearchZone from '@/app/components/SearchZone';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import React, { FC } from 'react';

const MyRecipes: FC<{
    searchParams: {
        page: number;
        limit: number;
        category: string;
        searchText: string;
    };
}> = async ({ searchParams }) => {
    const { userId } = auth();
    let result: any;
    if (userId) {
        result = await getRecipes({
            authorId: userId,
            page: searchParams.page,
            limit: searchParams.limit,
            category: searchParams.category,
            searchText: searchParams.searchText
        });
    } else {
        notFound();
    }

    return (
        <main className='container mx-auto py-8 px-6'>
            <SearchZone />
            <RecipeList
                recipes={result.recipes}
                currentPage={result.page}
                path={'/recipes/my/all'}
            />
        </main>
    );
};

export default MyRecipes;
