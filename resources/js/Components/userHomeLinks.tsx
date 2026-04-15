import { Link } from "@inertiajs/react";

const UserHomeLinks = () => {
    return ( 
        <div className="p-6 text-center font-mono max-w-md mx-auto">
            <h2 className="text-xl font-semibold ">Get Started</h2>
            <div className="p-6 flex flex-col space-y-8 text-lg">
                <Link href="/search" className="underline text-blue-200 hover:bg-blue-700 hover:transition max-w-xl border border-blue-600 rounded-lg  p-2">Search for Albums</Link>
                <Link href="/collection" className="underline text-yellow-200 hover:bg-yellow-700 hover:transition max-w-xl border border-yellow-600 rounded-lg  p-2">My Collection</Link>
                <Link href="/wishlist" className="underline text-green-200 hover:bg-green-700 hover:transition max-w-xl border border-green-600 rounded-lg  p-2">My Wishlist</Link>
                <Link href="/dashboard" className="underline text-purple-200 hover:bg-purple-700 hover:transition max-w-xl border border-purple-600 rounded-lg  p-2">My Account</Link>
            </div>
        </div>
     );
}
 
export default UserHomeLinks;