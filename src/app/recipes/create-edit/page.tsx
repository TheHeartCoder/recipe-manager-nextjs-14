import { FC } from 'react';
import RecipeUpsertForm from './components/RecipeUpsertForm';
import { getReciepe } from '@/app/action';

const RecipeUpsertPage: FC<{
    searchParams: {
        recipeId?: string;
    };
}> = async ({ searchParams }) => {
    let recipe = {};
    console.log(searchParams?.recipeId);

    if (searchParams?.recipeId) {
        recipe = await getReciepe(searchParams?.recipeId || '');
        console.log(recipe);
    }
    return (
        <div className='max-w-xl mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold text-gray-800 mb-8'>
                {searchParams?.recipeId ? 'Update Recipe' : 'Create Recipe'}
            </h1>

            <RecipeUpsertForm
                recipeId={searchParams.recipeId || ''}
                existRecipe={recipe}
            />
        </div>
    );
};

export default RecipeUpsertPage;
