import SearchZone from './components/SearchZone';
import RecipeList from './components/RecipeList';
import { getRecipes } from './action';
import { FC } from 'react';
import { Recipe } from '@prisma/client';

type SearchParams = {
    searchText?: string;
    authorId?: string;
    page?: number;
    limit?: number;
    category?: string;
    sortBy?: string;
};

type HomeProps = {
    searchParams: SearchParams;
};

type RecipesResult = {
    recipes: Recipe[];
    page: number;
};

const Home: FC<HomeProps> = async ({ searchParams }) => {
    const result: RecipesResult = await getRecipes(searchParams);
    return (
        <main className='container mx-auto py-8 px-6'>
            <SearchZone
                path='/'
                searchValue={searchParams.searchText}
                sortValue={searchParams.sortBy}
            />
            <RecipeList
                recipes={result.recipes}
                currentPage={result.page}
                path='/'
            />
        </main>
    );
};

export default Home;
