'use client';
import { SetStateAction, useState } from 'react';
import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import Rating from 'react-rating';
import { saveRating, saveRecipe } from '@/app/action';
import { Recipe } from '@/app/lib/interfaces/recipe.interface';

const RecipeDetails: FC<{
    recipe: Recipe;
    userId: string;
    alreadyRated?: boolean;
    saved?: boolean;
}> = ({ recipe, userId, alreadyRated, saved }) => {
    const handleSave = async () => {
        if (!saved) await saveRecipe(userId, recipe.recipeId);
    };

    const handleRate = async (ratingValue: SetStateAction<number>) => {
        if (!alreadyRated)
            await saveRating(userId, recipe.recipeId, Number(ratingValue));
    };

    return (
        <div className='max-w-4xl mx-auto px-4 py-8'>
            <div className='flex items-center justify-between mb-6'>
                <h1 className='text-3xl font-bold text-gray-800 flex items-center'>
                    {recipe.title}
                    <Rating
                        initialRating={recipe.rating}
                        readonly={true}
                        className='ml-2 text-yellow-400'
                        emptySymbol={
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='size-6'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
                                />
                            </svg>
                        }
                        fullSymbol={
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                fill='currentColor'
                                className='size-6'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        }
                    />
                </h1>
                <div className='flex items-center space-x-4'>
                    {recipe.authorId !== userId && (
                        <button
                            onClick={handleSave}
                            className={`${
                                saved ? 'text-blue-500' : 'text-gray-500'
                            } hover:text-blue-500 focus:outline-none`}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                fill='currentColor'
                                className='size-6'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </button>
                    )}

                    {!alreadyRated && recipe.authorId !== userId && (
                        <div className='flex items-center space-x-2'>
                            <Rating
                                initialRating={0}
                                onChange={handleRate}
                                className='ml-2 text-yellow-400'
                                emptySymbol={
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='size-6'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
                                        />
                                    </svg>
                                }
                                fullSymbol={
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        fill='currentColor'
                                        className='size-6'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                }
                            />
                        </div>
                    )}
                </div>
            </div>

            <img
                src={recipe.image}
                alt={recipe.title}
                className='mb-6 rounded-lg'
            />

            <p className='text-gray-600 mb-6'>{recipe.description}</p>

            <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
                <h2 className='text-lg font-bold text-gray-800 mb-2'>
                    Ingredients
                </h2>
                <ul className='divide-y divide-gray-100'>
                    {recipe.ingredients.map(
                        (ingredient: string, index: number) => (
                            <li key={index} className='py-3'>
                                <div className='flex items-center justify-between'>
                                    <p className='text-sm font-medium text-gray-800'>
                                        {ingredient}
                                    </p>
                                    <div className='flex items-center'>
                                        <input
                                            type='checkbox'
                                            className='h-6 w-6 text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500'
                                            name='ingredient'
                                        />
                                    </div>
                                </div>
                            </li>
                        )
                    )}
                </ul>
            </div>

            <div className='bg-white rounded-lg shadow-md p-6'>
                <h2 className='text-lg font-bold text-gray-800 mb-2'>Steps</h2>
                <ul className='list-none'>
                    {recipe.steps.map((step: string, index: number) => (
                        <li key={index} className='text-gray-600'>
                            <div className='mb-4'>
                                <div className='bg-gray-100 rounded-lg p-4'>
                                    <p className='font-medium'>{step}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='flex items-center border rounded-lg p-4 bg-white shadow-md mt-4'>
                <h3 className='mr-4'>Published By, </h3>
                {/* Rounded small image */}
                <div className='flex-shrink-0'>
                    <img
                        className='h-12 w-12 rounded-full'
                        src={recipe?.author?.image}
                        alt='User Image'
                    />
                </div>
                {/* Name and email address */}
                <div className='ml-4'>
                    <div className='font-semibold text-lg'>
                        {recipe?.author?.firstName} {recipe?.author?.lastName}
                    </div>
                    <div className='text-gray-600'>{recipe?.author?.email}</div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;
