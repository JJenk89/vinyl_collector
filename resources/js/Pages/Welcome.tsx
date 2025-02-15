import Header from '../Layouts/Header';
import AuthComponent from '@/Components/AuthComponent';
import { ReactNode } from 'react';
import { usePage } from '@inertiajs/react';
import UserHomeLinks from '@/Components/userHomeLinks';

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
            <div className="p-4 text-center">
                <h1 className="text-4xl font-black">Home</h1>
                <h3 className='text-m font-lg m-2'>Welcome to My Vinyl{auth.user ? `, ${auth.user && auth.user.name}` : null}!</h3>

                <div>
                    {!auth.user ? 
                        <>
                            <div className="p-6">
                                <p>This app is designed for record hunters.</p>
                                <p>In a shop an ever need to look up the album? Want to know the track list, when it was released and who recorded it?</p>
                                <p>Find it all here! You can then create a collection to look up while you're hunting for your latest treasured LP, or create a wishlist of albums you want.</p>
                                <p>Interested?</p>
                            </div>
                            <AuthComponent />
                        </>
                        :
                        <UserHomeLinks />
                    }
                
                </div>
            </div>
        </>
    );
}

Welcome.layout = (page: ReactNode): ReactNode => <Header children={page} />;

export default Welcome;