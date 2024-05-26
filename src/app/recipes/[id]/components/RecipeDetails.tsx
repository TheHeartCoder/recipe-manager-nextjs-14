'use client';
import { SetStateAction, useState } from 'react';
import React, { FC } from 'react';
import { useRouter } from 'next/navigation';

const RecipeDetails: FC<{ recipe: any }> = ({ recipe }) => {
    console.log(recipe);

    // const response = await clerkClient.users.getUser(recipe.authorId);
    const router = useRouter();
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [rating, setRating] = useState(0);

    const handleLike = () => {
        setLiked(!liked);
    };

    const handleSave = () => {
        setSaved(!saved);
    };

    const handleRate = (ratingValue: SetStateAction<number>) => {
        setRating(ratingValue);
    };

    return (
        <div className='max-w-4xl mx-auto px-4 py-8'>
            <div className='flex items-center justify-between mb-6'>
                <h1 className='text-3xl font-bold text-gray-800'>
                    {recipe.title}
                </h1>
                <div className='flex items-center space-x-4'>
                    <button
                        onClick={handleLike}
                        className={`${
                            liked ? 'text-red-500' : 'text-gray-500'
                        } hover:text-red-500 focus:outline-none`}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M5 15l7-7 7 7'
                            />
                        </svg>
                    </button>
                    <button
                        onClick={handleSave}
                        className={`${
                            saved ? 'text-blue-500' : 'text-gray-500'
                        } hover:text-blue-500 focus:outline-none`}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M19 14l-7 7m0 0l-7-7m7 7V3'
                            />
                        </svg>
                    </button>
                    <div className='flex items-center space-x-2'>
                        <button
                            onClick={() => handleRate(1)}
                            className={`text-yellow-500 ${
                                rating >= 1
                                    ? 'text-yellow-500'
                                    : 'text-gray-500'
                            } hover:text-yellow-500 focus:outline-none`}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M12 10V3L4 14h7v7l8-11h-7z'
                                />
                            </svg>
                        </button>
                        <button
                            onClick={() => handleRate(2)}
                            className={`text-yellow-500 ${
                                rating >= 2
                                    ? 'text-yellow-500'
                                    : 'text-gray-500'
                            } hover:text-yellow-500 focus:outline-none`}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M12 10V3L4 14h7v7l8-11h-7z'
                                />
                            </svg>
                        </button>
                        <button
                            onClick={() => handleRate(3)}
                            className={`text-yellow-500 ${
                                rating >= 3
                                    ? 'text-yellow-500'
                                    : 'text-gray-500'
                            } hover:text-yellow-500 focus:outline-none`}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M12 10V3L4 14h7v7l8-11h-7z'
                                />
                            </svg>
                        </button>
                        <button
                            onClick={() => handleRate(4)}
                            className={`text-yellow-500 ${
                                rating >= 4
                                    ? 'text-yellow-500'
                                    : 'text-gray-500'
                            } hover:text-yellow-500 focus:outline-none`}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M12 10V3L4 14h7v7l8-11h-7z'
                                />
                            </svg>
                        </button>
                        <button
                            onClick={() => handleRate(5)}
                            className={`text-yellow-500 ${
                                rating >= 5
                                    ? 'text-yellow-500'
                                    : 'text-gray-500'
                            } hover:text-yellow-500 focus:outline-none`}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-6 w-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M12 10V3L4 14h7v7l8-11h-7z'
                                />
                            </svg>
                        </button>
                    </div>
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
