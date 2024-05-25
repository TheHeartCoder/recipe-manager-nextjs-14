import Head from 'next/head';
import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import RecipeCard from './components/RecipeCard';
import Header from './components/Header';
import SearchZone from './components/SearchZone';
import RecipeList from './components/RecipeList';
export default function Home() {
    return (
        <main className='container mx-auto py-8 px-6'>
            <SearchZone />
            {/* <RecipeList recipes={[]} /> */}
        </main>
    );
}
