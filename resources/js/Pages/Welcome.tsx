import Header from '../Layouts/Header';
import { ReactNode } from 'react';

function Welcome() {
    return (
        <>
            <div className="p-4 text-center">
                <h1 className="text-4xl font-black">Home</h1>
                <p>This app lets you search Spotify's API for albums and artists.</p>
                <p>You can then save your record collection or create a wishlist!</p>
            </div>
        </>
    );
}

Welcome.layout = (page: ReactNode): ReactNode => <Header children={page} />;

export default Welcome;