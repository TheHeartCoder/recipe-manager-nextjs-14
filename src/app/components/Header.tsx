// components/Header.js
'use client';
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    useUser
} from '@clerk/nextjs';
import Link from 'next/link';
import { CATEGORY } from '../constants/recipe.constants';
import { useState } from 'react';
import useClickOutside from '../hooks/useClickOutSide';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    const user = useUser();
    const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
    const [recipeMenuOpen, setRecipeMenuOpen] = useState(false);

    const recipeMenuRef: any = useClickOutside(() => {
        setRecipeMenuOpen(false);
    });

    const categoryMenuRef: any = useClickOutside(() => {
        setCategoryMenuOpen(false);
    });

    return (
        <header className='bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 shadow-md py-4'>
            <div className='container mx-auto flex justify-between items-center px-4'>
                <Link legacyBehavior href='/'>
                    <a className='text-3xl font-bold text-white'>
                        Foodies - The Recipe Book
                    </a>
                </Link>
                <nav>
                    <ul className='flex space-x-8 items-center'>
                        <li>
                            <Link href='/recipes/create-edit' legacyBehavior>
                                <a className='flex items-center text-white hover:text-gray-300 transition-colors duration-300'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='w-6 h-6 mr-2'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                                        />
                                    </svg>
                                    New Recipe
                                </a>
                            </Link>
                        </li>
                        <li className='relative' ref={categoryMenuRef}>
                            <button
                                className='text-white hover:text-gray-300 transition-colors duration-300'
                                onClick={() =>
                                    setCategoryMenuOpen(!categoryMenuOpen)
                                }
                            >
                                Categories
                            </button>
                            <ul
                                className={`absolute top-full left-0 bg-white shadow-lg py-2 rounded-md mt-1 ${
                                    categoryMenuOpen ? 'block' : 'hidden'
                                }`}
                            >
                                {CATEGORY.map((category: string) => (
                                    <li key={category} className='px-4 py-2'>
                                        <Link
                                            href={`/?category=${category}`}
                                            className='text-gray-800 hover:text-blue-500 transition-colors duration-300'
                                        >
                                            {category}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        {user.isSignedIn && (
                            <li className='relative' ref={recipeMenuRef}>
                                <button
                                    className='text-white hover:text-gray-300 transition-colors duration-300'
                                    onClick={() =>
                                        setRecipeMenuOpen(!recipeMenuOpen)
                                    }
                                >
                                    Recipes
                                </button>
                                <ul
                                    className={`absolute top-full left-0 bg-white shadow-lg py-2 rounded-md mt-1 ${
                                        recipeMenuOpen ? 'block' : 'hidden'
                                    }`}
                                >
                                    <li className='px-4 py-2'>
                                        <Link
                                            href={`/recipes/my/all`}
                                            legacyBehavior
                                        >
                                            <a className='text-gray-800 hover:text-blue-500 transition-colors duration-300'>
                                                Mine
                                            </a>
                                        </Link>
                                    </li>
                                    <li className='px-4 py-2'>
                                        <Link
                                            href={`/recipes/my/saved`}
                                            legacyBehavior
                                        >
                                            <a className='text-gray-800 hover:text-blue-500 transition-colors duration-300'>
                                                Saved
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        )}

                        <li>
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
