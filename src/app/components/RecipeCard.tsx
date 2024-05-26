// components/RecipeCard.tsx

import { User } from '@clerk/nextjs/server';
import Link from 'next/link';

interface Recipe {
    recipeId: number;
    title: string;
    image: string;
    rating: number;
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
            <div className='bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg'>
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
