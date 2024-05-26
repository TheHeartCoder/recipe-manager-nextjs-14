export interface Recipe {
    recipeId: string; // MongoDB ObjectId mapped to _id field
    title: string;
    description: string;
    ingredients: string[];
    steps: string[];
    image: string;
    category: string;
    rating?: number; // Optional field
    cookingTimeInMinutes: number;
    createdAt: Date;
    authorId: string;
    author: {
        firstName: string;
        lastname: string;
        image: string;
        email: string;
    };
}
