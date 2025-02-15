import { Link } from "@inertiajs/react";

const UserHomeLinks = () => {
    return ( 
        <div className="p-6 text-center">
            <h2 className="text-lg font-semibold">Get Started Using My Vinyl</h2>
            <div className="p-6 flex flex-col space-y-4">
                <Link href="/search" className="underline text-blue-600">Search for Albums</Link>
                <Link href="/collection" className="underline text-blue-600">My Collection</Link>
                <Link href="/wishlist" className="underline text-blue-600">My Wishlist</Link>
            </div>
        </div>
     );
}
 
export default UserHomeLinks;