'use client';
import { createRecipe, updateRecipe } from '@/app/action';
import { CATEGORY } from '@/app/constants/recipe.constants';
import { useUser } from '@clerk/nextjs';
import { Recipe } from '@prisma/client';
import { FC, Key, useState } from 'react';
import { useFormStatus } from 'react-dom';

const RecipeUpsertForm: FC<{
    recipeId: string;
    existRecipe: Recipe;
}> = ({ recipeId, existRecipe }) => {
    const { pending } = useFormStatus();
    const user = useUser();
    const [ingredients, setIngredients] = useState(
        existRecipe?.ingredients || ['']
    );
    const [steps, setSteps] = useState(existRecipe?.steps || ['']);

    const handleIngredientChange = (index: number, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const handleStepChange = (index: number, value: string) => {
        const newSteps = [...steps];
        newSteps[index] = value;
        setSteps(newSteps);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const handleAddStep = () => {
        setSteps([...steps, '']);
    };

    const handleDeleteIngredient = (index: number) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    };

    const handleDeleteStep = (index: number) => {
        const newSteps = [...steps];
        newSteps.splice(index, 1);
        setSteps(newSteps);
    };

    const createRecipeWithBind = createRecipe.bind(
        null,
        ingredients,
        steps,
        user?.user?.id || ''
    );

    const uodateRecipeWithBind = updateRecipe.bind(
        null,
        ingredients,
        steps,
        user?.user?.id || '',
        recipeId
    );

    return (
        <form
            action={recipeId ? uodateRecipeWithBind : createRecipeWithBind}
            className='space-y-6'
        >
            <div>
                <label
                    htmlFor='title'
                    className='block text-gray-700 font-medium mb-1'
                >
                    Title
                </label>
                <input
                    type='text'
                    id='title'
                    name='title'
                    defaultValue={existRecipe?.title}
                    className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500'
                    required
                />
            </div>

            <div>
                <label
                    htmlFor='description'
                    className='block text-gray-700 font-medium mb-1'
                >
                    Description
                </label>
                <select
                    id='category'
                    name='category'
                    defaultValue={existRecipe?.category || ''}
                    className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500'
                    required
                >
                    <option key={1} value={''}>
                        Select category
                    </option>
                    {CATEGORY.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label
                    htmlFor='description'
                    className='block text-gray-700 font-medium mb-1'
                >
                    Description
                </label>
                <textarea
                    id='description'
                    name='description'
                    defaultValue={existRecipe?.description}
                    rows={4}
                    className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500'
                    required
                />
            </div>

            <div>
                <label
                    htmlFor='image'
                    className='block text-gray-700 font-medium mb-1'
                >
                    Image URL
                </label>
                <input
                    type='text'
                    id='image'
                    name='image'
                    defaultValue={existRecipe?.image}
                    className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500'
                    required
                />
            </div>

            <div>
                <label
                    htmlFor='cookingTime'
                    className='block text-gray-700 font-medium mb-1'
                >
                    Cooking Time (In Minutes)
                </label>
                <input
                    type='text'
                    id='cookingTimeInMinutes'
                    defaultValue={existRecipe?.cookingTimeInMinutes}
                    name='cookingTimeInMinutes'
                    className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500'
                    required
                />
            </div>

            <div>
                <label className='block text-gray-700 font-medium mb-1'>
                    Ingredients
                </label>
                {ingredients.map((ingredient: string, index: number) => (
                    <div key={index} className='flex items-center'>
                        <input
                            type='text'
                            name='ingredients[]'
                            defaultValue={ingredient}
                            onChange={(e) =>
                                handleIngredientChange(index, e.target.value)
                            }
                            className='w-full border border-gray-300 rounded-md px-4 py-2 mb-2 focus:outline-none focus:border-blue-500'
                            placeholder={`Ingredient ${index + 1}`}
                            required
                        />
                        <button
                            type='button'
                            onClick={() => handleDeleteIngredient(index)}
                            className='ml-2 text-red-600 font-medium focus:outline-none'
                        >
                            Delete
                        </button>
                    </div>
                ))}
                <button
                    type='button'
                    onClick={handleAddIngredient}
                    className='text-blue-600 font-medium focus:outline-none'
                >
                    + Add Ingredient
                </button>
            </div>

            <div>
                <label className='block text-gray-700 font-medium mb-1'>
                    Steps
                </label>
                {steps.map((step: string, index: number) => (
                    <div key={index} className='flex items-center'>
                        <textarea
                            defaultValue={step}
                            onChange={(e) =>
                                handleStepChange(index, e.target.value)
                            }
                            name='steps'
                            rows={4}
                            className='w-full border border-gray-300 rounded-md px-4 py-2 mb-2 focus:outline-none focus:border-blue-500'
                            placeholder={`Step ${index + 1}`}
                            required
                        />
                        <button
                            type='button'
                            onClick={() => handleDeleteStep(index)}
                            className='ml-2 text-red-600 font-medium focus:outline-none'
                        >
                            Delete
                        </button>
                    </div>
                ))}
                <button
                    type='button'
                    onClick={handleAddStep}
                    className='text-blue-600 font-medium focus:outline-none'
                >
                    + Add Step
                </button>
            </div>
            <button
                type='submit'
                className='bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none'
                disabled={pending}
            >
                {recipeId ? 'Update Recipe' : 'Create Recipe'}
            </button>
        </form>
    );
};

export default RecipeUpsertForm;
