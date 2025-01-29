import Header from '../Layouts/Header';
import { ReactNode } from 'react';

function Welcome() {
    return (
        <>
            <div className="p-4 text-center">
                <h1 className="text-4xl font-black">Home</h1>
            </div>
        </>
    );
}

Welcome.layout = (page: ReactNode): ReactNode => <Header children={page} />;

export default Welcome;