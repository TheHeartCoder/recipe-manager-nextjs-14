// components/Header.js

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
// import { currentUser } from '@clerk/nextjs/server';s
import Link from 'next/link';
import { CATEGORY } from '../constants/recipe.constants';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = async () => {
    return (
        <header className='bg-white shadow-md py-4'>
            <div className='container mx-auto flex justify-between items-center'>
                <Link legacyBehavior href='/'>
                    <a className='text-2xl font-bold text-gray-800'>
                        Foodies - The recipe book
                    </a>
                </Link>
                <nav>
                    <ul className='flex space-x-6'>
                        <li className='relative'>
                            <button className='text-gray-800 hover:text-blue-500'>
                                Categories
                            </button>
                            <ul className='absolute top-full left-0 bg-white shadow-md py-2 px-4 rounded-md mt-1 hidden'>
                                {CATEGORY.map((category: string) => (
                                    <li key={category}>
                                        <Link
                                            legacyBehavior
                                            href={`/category/${category.toLowerCase()}`}
                                        >
                                            <a className='text-gray-800 hover:text-blue-500'>
                                                {category}
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </li>
                        <li>
                            <Link href='/recipes/create-edit' legacyBehavior>
                                <a className='text-gray-800 hover:text-blue-500'>
                                    New Recipe
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/my-recipes' legacyBehavior>
                                <a className='text-gray-800 hover:text-blue-500'>
                                    My Recipes
                                </a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
