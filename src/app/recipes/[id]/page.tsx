import { getReciepe, getRecipes } from '@/app/action';
import RecipeDetails from './components/RecipeDetails';
import { FC } from 'react';

const RecipeDetailsPage: FC<{ params: { id: string } }> = async ({
    params
}) => {
    const recipe = await getReciepe(params?.id);
    const recipes = await getRecipes({ category: recipe.category, limit: 3 });

    return <RecipeDetails recipe={recipe} />;
};

export default RecipeDetailsPage;
