import { Link } from "@inertiajs/react";

const UserHomeLinks = () => {
    return ( 
        <div className="p-6 text-center font-mono">
            <h2 className="text-xl font-semibold ">Get Started</h2>
            <div className="p-6 flex flex-col space-y-4 text-lg">
                <Link href="/search" className="underline text-blue-600">Search for Albums</Link>
                <Link href="/collection" className="underline text-yellow-800">My Collection</Link>
                <Link href="/wishlist" className="underline text-green-600">My Wishlist</Link>
                <Link href="/dashboard" className="underline text-purple-600">My Account</Link>
            </div>
        </div>
     );
}
 
export default UserHomeLinks;