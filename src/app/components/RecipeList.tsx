import React, { FC } from 'react';
import RecipeCard from './RecipeCard';
import Link from 'next/link';

interface RecipeProps {
    recipeId: string;
    title: string;
    description: string;
    ingredients: string[];
    steps: string[];
    image: string;
    cookingTimeInMinutes: number;
    createdAt: Date;
    authorId: string;
}

const RecipeList: FC<{
    recipes: RecipeProps[];
    currentPage: number;
    path: string;
}> = ({ recipes, currentPage, path }) => {
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {recipes.map((recipe: any) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>

            {/* Pagination Goes Here */}
            <div className='mt-8 flex justify-center'>
                <Link
                    href={`${path}/?page=${currentPage - 1}`}
                    className='bg-blue-500 text-white px-4 py-2 rounded-md'
                    hidden={currentPage === 0}
                >
                    {'<<'}
                </Link>
                <Link
                    href={`${path}/?page=${currentPage + 1}`}
                    className='bg-blue-500 text-white px-4 py-2 rounded-md ml-4'
                >
                    {'>>'}
                </Link>
            </div>
        </>
    );
};

export default RecipeList;
