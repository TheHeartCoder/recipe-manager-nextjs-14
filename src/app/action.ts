'use server';
import { cache } from 'react';
import { prisma } from './lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { z } from 'zod';
import { sortMethods } from './constants/recipe.constants';
import { clerkClient } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

const recipeSchema = z.object({
    title: z.string(),
    description: z.string(),
    ingredients: z.array(z.string()),
    steps: z.array(z.string()),
    image: z.string().url(),
    cookingTimeInMinutes: z.number().int().positive(),
    category: z.string()
});

type Recipe = z.infer<typeof recipeSchema>;

export const getReciepe = cache(async (recipeId: string) => {
    const recipe = await prisma.recipe.findUnique({
        where: { recipeId }
    });
    if (!recipe) notFound();
    const response = await clerkClient.users.getUser(recipe.authorId);
    console.log(response);
    console.log(response.emailAddresses[0].emailAddress);

    return {
        ...recipe,
        author: {
            email: response.emailAddresses[0].emailAddress,
            id: response.id,
            firstName: response.firstName,
            lastName: response.lastName,
            image: response.imageUrl
        }
    };
});

// Function to get recipes by various filters
export const getRecipes = cache(
    async (data: {
        searchText?: string;
        authorId?: string;
        page?: number;
        limit?: number;
        category?: string;
        sortBy?: string;
    }) => {
        const {
            searchText,
            authorId,
            page = 1,
            limit = 12,
            category,
            sortBy
        } = data;

        try {
            let whereClause: any = {};
            let orderByClause: any = {};

            if (authorId) {
                whereClause = {
                    ...whereClause,
                    authorId
                };
                orderByClause = {
                    ...orderByClause,
                    createdAt: 'desc'
                };
            }

            if (searchText) {
                whereClause = {
                    ...whereClause,
                    title: { contains: searchText, mode: 'insensitive' }
                };
            }

            if (category) {
                whereClause = {
                    ...whereClause,
                    category
                };
            }

            if (sortBy) {
                orderByClause = sortMethods[sortBy]?.orderBy;
            }

            const recipes = await prisma.recipe.findMany({
                where: whereClause,
                take: limit || 12,
                skip: (page - 1) * limit,
                orderBy: orderByClause
            });

            return { recipes, page: data?.page || 1 };
        } catch (error: any) {
            throw new Error(`Failed to fetch recipes: ${error.message}`);
        }
    }
);

export async function createRecipe(
    ingredients: string[],
    steps: string[],
    userId: string,
    formData: FormData
) {
    let recipe;
    try {
        const data = {
            title: formData.get('title'),
            description: formData.get('description'),
            ingredients,
            steps,
            image: formData.get('image'),
            cookingTimeInMinutes: Number(formData.get('cookingTimeInMinutes')),
            authorId: userId,
            category: formData.get('category')
        };
        // Validate the data
        const parsedData: any = recipeSchema.safeParse(data);

        if (!parsedData.success) {
            // If parsing failed, throw an error with details of the validation errors
            throw new Error(
                parsedData.error.errors
                    .map((err: any) => err.message)
                    .join('\n')
            );
        }

        // Create the recipe in the database
        recipe = await prisma.recipe.create({
            data: parsedData.data
        });
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message || 'Internal server error');
    }

    redirect('/recipes/' + recipe?.recipeId);
}

export async function updateRecipe(
    ingredients: string[],
    steps: string[],
    authorId: string,
    recipeId: string,
    formData: FormData
) {
    let recipe;
    try {
        const payload: any = {
            title: formData.get('title'),
            description: formData.get('description'),
            ingredients,
            steps,
            image: formData.get('image'),
            cookingTimeInMinutes: Number(formData.get('cookingTimeInMinutes')),
            category: formData.get('category')
        };

        console.log(payload);

        // Validate the data
        const parsedData: any = recipeSchema.safeParse(payload);

        if (!parsedData.success) {
            // If parsing failed, throw an error with details of the validation errors
            throw new Error(
                parsedData.error.errors
                    .map((err: any) => err.message)
                    .join('\n')
            );
        }

        console.log(parsedData, authorId, recipeId);

        // update the recipe in the database
        recipe = await prisma.recipe.update({
            where: { recipeId, authorId },
            data: parsedData.data
        });
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message || 'Internal server error');
    }
    redirect('/recipes/' + recipe?.recipeId);
}

export async function saveRecipe(userId: string, recipeId: string) {
    try {
        if (!userId || !recipeId) {
            throw new Error('Invalid user or recipe id');
        }

        await prisma.savedRecipe.create({
            data: { userId, recipeId }
        });
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message || 'Internal server error');
    }
    redirect('/recipes/my/saved');
}

export async function saveRating(
    userId: string,
    recipeId: string,
    rating: number
) {
    try {
        if (!userId || !recipeId || !rating) {
            throw new Error('Invalid data');
        }

        await prisma.rating.create({
            data: { userId, recipeId, rating }
        });

        const ratings = await prisma.rating.findMany({
            where: { recipeId }
        });

        const avgRating =
            ratings.reduce((acc, curr) => acc + curr.rating, 0) /
            ratings.length;

        await prisma.recipe.update({
            where: { recipeId },
            data: { rating: avgRating }
        });
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message || 'Internal server error');
    }
    revalidatePath(`/recipes/${recipeId}`);
}

export const getSavedRecipe = cache(
    async (recipeId: string, userId: string) => {
        const savedRecipe = await prisma.savedRecipe.findFirst({
            where: { recipeId, userId }
        });
        return savedRecipe;
    }
);

export const getSavedRating = cache(
    async (recipeId: string, userId: string) => {
        const rating = await prisma.rating.findFirst({
            where: { recipeId, userId }
        });
        return rating;
    }
);
