import { Link } from "@inertiajs/react";



export default function Welcome() {
    
    return (
        <>
        <div className="flex-col min-h-screen p-4 text-center">

            <h1 className="text-4xl font-black">Vinyl App</h1>

            <Link href="/Collection" className="text-1xl underline text-blue-700 mx-3">View Collection</Link>
            <Link href="/Search" className="text-1xl underline text-blue-700">Album Finder</Link>


        </div>
        </>
    );
}

