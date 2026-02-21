import { Link, usePage } from '@inertiajs/react';
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
            document.querySelector('.slider')?.classList.add('hidden');
            document.querySelector('.cancel')?.classList.remove('hidden');
        } else {
            document.body.style.overflow = 'auto';
            document.querySelector('.slider')?.classList.remove('hidden');
            document.querySelector('.cancel')?.classList.add('hidden');
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    return (
        <>
            <header className='bg-neutral-950 flex justify-between items-center p-4 fixed top-0 left-0 right-0 z-50 font-mono'>
                <Link onClick={() => setIsOpen(false)} href="/" className="text-4xl font-display text-purple-950 mx-3">
                    <img src="/assets/LogoMonoton.svg" alt="My Vinyl" width={150} height={100}/>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex bg-neutral-950 justify-evenly items-center p-4">
                    <Link  href="/search" className={`text-1xl text-gray-200 mx-3 hover:underline rounded ${url === '/search' ? "bg-purple-950 p-0.5 rounded" : "bg-neutral-950"}`}>
                        Album Finder
                    </Link>
                    <Link href="/collection" className={`text-1xl text-gray-200 mx-3 hover:underline rounded  ${url === '/collection' ? "bg-purple-950 p-0.5 rounded" : "bg-neutral-950"}`}>
                        View Collection
                    </Link>
                    <Link href="/wishlist" className={`text-1xl text-gray-200 mx-3 hover:underline rounded  ${url === '/wishlist' ? "bg-purple-950 p-0.5 rounded" : "bg-neutral-950"}`}>
                        View Wishlist
                    </Link>
                    {auth.user ? <Link onClick={() => setIsOpen(false)} href="/dashboard" className={`text-1xl text-gray-200 mx-3 hover:underline rounded ${url === '/dashboard' ? "bg-purple-950 p-0.5 rounded" : "bg-neutral-950"}`}>
                        My Account</Link> : null}
                </nav>

                {/* Mobile Menu Toggle Button */}
                <button onClick={() => setIsOpen(!isOpen)} className="block md:hidden">
                    <img src="/assets/Slider.svg" alt="menu button" width={40} height={40} className='slider'/>
                    <img src="/assets/Cancel.svg" alt="menu button" width={40} height={40} className='cancel hidden'/>
                </button>
            </header>

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <nav className="fixed top-16 left-0 right-0 bottom-0 bg-black flex flex-col items-center space-y-10 z-40 pt-20 overflow-y-auto text-xl font-mono ">

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
                    
                    <Link
                        className="border border-red-600 text-gray-300 p-2 rounded"
                        method="post"
                        as="button"
                        href={route('logout')}
                        onClick={() => setIsOpen(false)}
                    >
                        Log Out
                    </Link>
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