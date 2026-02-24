import { Link, } from '@inertiajs/react';

const MiniNav = () => {
    return ( 
        <nav className='pt-14 pb-10 text-center font-mono md:hidden'>
            <Link href="/" className="underline m-4 text-gray-300">Home</Link>
            <Link href="/search" className="underline m-4 text-gray-300">Search</Link>
            <Link href="/collection" className="underline m-4 text-gray-300">Collection</Link>
            <Link href="/wishlist" className="underline m-4 text-gray-300">Wishlist</Link>
        </nav>
     );
}
 
export default MiniNav;