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
                <h3 className='text-m text-xl m-2 font-mono pt-4 pb-8'>Welcome to My Vinyl<span className='text-green-600 font-semibold'>{auth.user ? ` ${auth.user && auth.user.name}` : null}</span>!</h3>

                <div >
                    {!auth.user ? 
                        <>
                            <div className="p-6 font-mono m-4 max-w-3xl mx-auto text-left">
                                <p className='mb-4'>This app is designed for record hunters.</p>
                                <p className='mb-4'>In a shop an ever need to look up the album? Want to know the track list, when it was released and who recorded it?</p>
                                <p className='mb-4'>Find it all here! You can then create a collection to look up while you're hunting for your latest treasured LP, or create a wishlist of albums you want.</p>
                                <p className='mb-4'>Interested?</p>
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