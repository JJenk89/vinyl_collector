import Header from '../Layouts/Header';
import AuthComponent from '@/Components/AuthComponent';
import { ReactNode } from 'react';
import { usePage } from '@inertiajs/react';
import UserHomeLinks from '@/Components/userHomeLinks';
import Footer from '@/Components/Footer';

function Welcome() {

    const { auth } = usePage().props as {
        auth: {
            user: {
                name: string;
            } | null;
        };
    };

    return (
        <>
            <div className="p-4 text-center bg-neutral-950 text-gray-300 min-h-screen pt-20">
                <h1 className="text-5xl   font-header ">Home</h1>
                <h3 className='text-2xl font-bold m-2 font-mono pt-8 pb-8'>Welcome to My Vinyl<span className='text-green-600 font-semibold'>{auth.user ? ` ${auth.user && auth.user.name}` : null}</span>!</h3>

                <div >
                    {!auth.user ? 
                        <>
                            <div className="p-6 font-mono m-4 max-w-md mx-auto text-center border-l-4 rounded-md border-indigo-700 bg-slate-950 mb-24">
                                <p className='mb-12'>This app is built for record hunters.</p>
                                <p className='mb-12'>Ever been in a record shop and needed to quickly look up an album?
                                Check the tracklist, release year, or who recorded it right on the spot.</p>
                                <p className='mb-12'>Discover everything you need in seconds. Then build your own collection or create a wishlist for your next crate-digging session.</p>
                                <p className='mb-12'>Start tracking your vinyls here.</p>
                            </div>
                            <AuthComponent />
                        </>
                        :
                        <UserHomeLinks />
                    }
                
                </div>

                <Footer />
            </div>
        </>
    );
}

Welcome.layout = (page: ReactNode): ReactNode => <Header children={page} />;

export default Welcome;