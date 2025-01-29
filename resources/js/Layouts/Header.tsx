import { Link } from '@inertiajs/react';

import { ReactNode } from 'react';

const Header = ({ children }: { children: ReactNode }) => {
    return ( 
        <>
            <header>
                <nav className="bg-blue-950 flex justify-between items-center p-4">
                    <Link href="/" className="text-4xl font-black text-gray-400 mx-3">My Vinyl</Link>
                    

                    <Link href="/Collection" className="text-1xl text-gray-200 mx-3 hover:underline">View Collection</Link>
                    <Link href="/Search" className="text-1xl text-gray-200 hover:underline">Album Finder</Link>
                    <Link href="/Wishlist" className="text-1xl text-gray-200 mx-3 hover:underline">Wishlist</Link>
                </nav>
            </header>

            <main>
                {children}
            </main>
        </>
     );
}
 
export default Header;