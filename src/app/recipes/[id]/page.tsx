import {
    getReciepe,
    getRecipes,
    getSavedRating,
    getSavedRecipe
} from '@/app/action';
import RecipeDetails from './components/RecipeDetails';
import { FC } from 'react';
import RecipeList from '@/app/components/RecipeList';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';

const RecipeDetailsPage: FC<{ params: { id: string } }> = async ({
    params
}) => {
    const { userId } = auth();
    const recipe = await getReciepe(params?.id);
    const data = await getRecipes({ category: recipe.category, limit: 4 });
    const [existSavedRecipe, existRating] = await Promise.all([
        getSavedRecipe(recipe.recipeId, userId || ''),
        getSavedRating(recipe.recipeId, userId || '')
    ]);
    const filteredRecipes = data.recipes?.filter(
        (r) => r.recipeId !== recipe.recipeId
    );

    return (
        <>
            <RecipeDetails
                recipe={recipe}
                userId={userId || ''}
                saved={existSavedRecipe ? true : false}
                alreadyRated={existRating ? true : false}
            />
            <hr />
            <div className='container mx-auto py-8 px-6'>
                {filteredRecipes?.length > 0 && (
                    <RecipeList recipes={filteredRecipes} />
                )}
                <Link
                    href={'/'}
                    className='text-sm text-indigo-600 hover:text-indigo-700 bg-indigo-100 hover:bg-indigo-200 px-3 py-1 rounded-md'
                >
                    More...
                </Link>
            </div>
        </>
    );
};

export default RecipeDetailsPage;
