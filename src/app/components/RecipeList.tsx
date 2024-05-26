import React, { FC } from 'react';
import RecipeCard from './RecipeCard';
import Link from 'next/link';
import { auth, currentUser } from '@clerk/nextjs/server';

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
    currentPage?: number;
    path?: string;
    isMyRecipe?: boolean;
}> = async ({ recipes, currentPage = 1, path = '/', isMyRecipe }) => {
    const user = await currentUser();
    return (
        <>
            {recipes?.length < 1 ? (
                <h2 className='text-center text-red-500 text-3xl font-bold mb-4'>
                    No recipes found
                </h2>
            ) : (
                <>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {recipes.map((recipe: any) => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                user={user}
                                isMyRecipe={isMyRecipe || false}
                            />
                        ))}
                    </div>

                    {/* Pagination Goes Here */}
                    <div className='mt-8 flex justify-center'>
                        <Link
                            href={`${path}/?page=${currentPage - 1}`}
                            className='bg-blue-500 text-white px-4 py-2 rounded-md'
                            hidden={currentPage === 1}
                        >
                            {'<<'}
                        </Link>
                        <Link
                            href={`${path}/?page=${currentPage + 1}`}
                            className='bg-blue-500 text-white px-4 py-2 rounded-md ml-4'
                            hidden={recipes?.length < 12}
                        >
                            {'>>'}
                        </Link>
                    </div>
                </>
            )}
        </>
    );
};

export default RecipeList;
