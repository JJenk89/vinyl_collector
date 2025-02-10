import { Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';

const Header = ({ children }: { children: ReactNode }) => {

    const { url } = usePage();

    return ( 
        <>
            <header>
                <nav className="bg-blue-950 flex justify-between items-center p-4">
                    <Link href="/" className="text-4xl font-black text-gray-400 mx-3">My Vinyl</Link>
                    

                    <Link href="/collection" className={`text-1xl text-gray-200 mx-3 hover:underline ${url === '/collection' ? "bg-red-900 p-2 rounded" : "bg-blue-950"}`}>View Collection</Link>
                    <Link href="/search" className={`text-1xl text-gray-200 mx-3 hover:underline ${url === '/search' ? "bg-red-900 p-2 rounded" : "bg-blue-950"}`}>Album Finder</Link>
                    <Link href="/wishlist" className={`text-1xl text-gray-200 mx-3 hover:underline ${url === '/wishlist' ? "bg-red-900 p-2 rounded" : "bg-blue-950"}`}>View Wishlist</Link>
                </nav>
            </header>

            <main>
                {children}
            </main>
        </>
     );
}
 
export default Header;