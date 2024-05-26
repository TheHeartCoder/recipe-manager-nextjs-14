// components/RecipeCard.tsx

import { User } from '@clerk/nextjs/server';
import Link from 'next/link';

interface Recipe {
    recipeId: number;
    title: string;
    image: string;
    rating: number;
    likesCount: number;
    cookingTimeInMinutes: string;
    category: string;
    published: boolean;
}

const RecipeCard: React.FC<{
    recipe: Recipe;
    user: User | null;
    isMyRecipe?: boolean;
}> = ({ recipe, user, isMyRecipe }) => {
    return (
        <Link
            href={`/recipes/${recipe.recipeId}`}
            legacyBehavior
            scroll={false}
        >
            <div className='bg-white shadow-md rounded-lg overflow-hidden'>
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className='w-full h-48 object-cover object-center'
                />
                <div className='p-4'>
                    <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                        {recipe.title}
                    </h3>
                    <p className='text-gray-600 mb-4'>{recipe.category}</p>
                    <div className='flex items-center mb-2'>
                        {recipe.rating && (
                            <div className='flex items-center mr-4'>
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

                                <span className='text-gray-600 ml-1'>
                                    {recipe.rating}
                                </span>
                            </div>
                        )}

                        {recipe.likesCount && (
                            <div className='flex items-center mr-4'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    fill='currentColor'
                                    className='size-6'
                                >
                                    <path d='M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z' />
                                </svg>

                                <span className='text-gray-600 ml-1'>
                                    {recipe.likesCount}
                                </span>
                            </div>
                        )}

                        <div className='flex items-center'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                fill='currentColor'
                                className='size-6'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z'
                                    clipRule='evenodd'
                                />
                            </svg>

                            <span className='text-gray-600 ml-1'>
                                {recipe.cookingTimeInMinutes} minutes
                            </span>
                        </div>
                    </div>
                    {user?.id && isMyRecipe && (
                        <div className='flex justify-end'>
                            <Link
                                href={`/recipes/create-edit?recipeId=${recipe.recipeId}`}
                                className='bg-blue-500 text-white py-1 px-4 rounded-md mr-2'
                            >
                                Edit
                            </Link>
                            <button className='bg-red-500 text-white py-1 px-4 rounded-md mr-2'>
                                Delete
                            </button>
                            <button
                                className={`bg-${
                                    recipe.published ? 'green' : 'gray'
                                }-500 text-white py-1 px-4 rounded-md`}
                            >
                                {recipe.published ? 'Unpublish' : 'Publish'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default RecipeCard;
