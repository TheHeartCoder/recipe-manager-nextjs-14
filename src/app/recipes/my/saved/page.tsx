import RecipeList from '@/app/components/RecipeList';
import SearchZone from '@/app/components/SearchZone';
import React from 'react';

const MySavedRecipes = () => {
    return (
        <main className='container mx-auto py-8 px-6'>
            <SearchZone />
            {/* <RecipeList recipes={[]} /> */}
        </main>
    );
};

export default MySavedRecipes;
