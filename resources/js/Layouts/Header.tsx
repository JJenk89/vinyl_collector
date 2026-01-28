import { Link, usePage } from '@inertiajs/react';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { useState, ReactNode } from 'react';
import { useEffect } from 'react';

const Header = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { url } = usePage();
    const { auth } = usePage().props as {
        auth: {
            user: {
                name: string;
            } | null;
        };
    }

    // Prevent scrolling when the menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    return (
        <>
            <header className='bg-neutral-950 flex justify-between items-center p-4 fixed top-0 left-0 right-0 z-50 border-b-purple-950 border-b-2'>
                <Link onClick={() => setIsOpen(false)} href="/" className="text-4xl font-display text-purple-950 mx-3">
                    My Vinyl
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex bg-neutral-950 justify-evenly items-center p-4">
                    <Link  href="/collection" className={`text-1xl text-gray-200 mx-3 hover:underline rounded ${url === '/collection' ? "bg-purple-950 p-0.5 rounded" : "bg-neutral-950"}`}>
                        View Collection
                    </Link>
                    <Link href="/search" className={`text-1xl text-gray-200 mx-3 hover:underline rounded  ${url === '/search' ? "bg-purple-950 p-0.5 rounded" : "bg-neutral-950"}`}>
                        Album Finder
                    </Link>
                    <Link href="/wishlist" className={`text-1xl text-gray-200 mx-3 hover:underline rounded  ${url === '/wishlist' ? "bg-purple-950 p-0.5 rounded" : "bg-neutral-950"}`}>
                        View Wishlist
                    </Link>
                    {auth.user ? <Link onClick={() => setIsOpen(false)} href="/dashboard" className={`text-1xl text-gray-200 hover:underline rounded p-2 ${url === '/dashboard' ? "bg-purple-950 p-0.5 rounded" : "bg-neutral-950"}`}>
                        My Account</Link> : null}
                </nav>

                {/* Mobile Menu Toggle Button */}
                <button onClick={() => setIsOpen(!isOpen)} className="block md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 text-gray-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>
                </button>
            </header>

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <nav className="fixed top-16 left-0 right-0 bottom-0 bg-black flex flex-col items-center space-y-6 z-40 overflow-y-auto">

                    <Link onClick={() => setIsOpen(false)} href="/" className={`text-1xl text-gray-200 hover:bg-yellow-700 rounded hover:p-1 p-2 mt-4 ${url === '/' ? "bg-purple-900 p-0.5 rounded" : "bg-black"}`}>
                        Home
                    </Link>

                    <Link onClick={() => setIsOpen(false)} href="/search" className={`text-1xl text-gray-200 hover:bg-yellow-700 rounded hover:p-1 p-2 ${url === '/search' ? "bg-purple-950 p-0.5 rounded" : "bg-black"}`}>
                        Album Finder
                    </Link>

                    <Link onClick={() => setIsOpen(false)} href="/collection" className={`text-1xl text-gray-200 hover:bg-yellow-700 rounded hover:p-1 p-2 ${url === '/collection' ? "bg-purple-950 p-0.5 rounded" : "bg-black"}`}>
                        View Collection
                    </Link>
                    
                    <Link onClick={() => setIsOpen(false)} href="/wishlist" className={`text-1xl text-gray-200 hover:bg-yellow-700 rounded hover:p-1 p-2 ${url === '/wishlist' ? "bg-purple-950 p-0.5 rounded" : "bg-black"}`}>
                        View Wishlist
                    </Link>
                    {auth.user ? 
                    
                    <>
                    <Link onClick={() => setIsOpen(false)} href="/dashboard" className={`text-1xl text-gray-200 hover:bg-yellow-700 rounded hover:p-1 p-2 ${url === '/dashboard' ? "bg-purple-950 p-0.5 rounded" : "bg-black"}`}>
                        My Account</Link>
                    
                    <ResponsiveNavLink
                        method="post"
                        as="button"
                        href={route('logout')}
                        onClick={() => setIsOpen(false)}
                    >
                        Log Out
                    </ResponsiveNavLink>
                    </>
                        
                        
                        : null}
                </nav>
            )}

            <main className="pt-16">
                {children}
            </main>
        </>
    );
};

export default Header;