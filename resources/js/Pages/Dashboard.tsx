import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Header from '@/Layouts/Header';
import { Head, Link } from '@inertiajs/react';
import { ReactNode } from 'react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-300 bg-neutral-950">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-neutral-950 shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-300">
                            You're logged in!
                        </div>
                    </div>
                    <Link href='/' className='underline text-gray-300'>Home</Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

Dashboard.layout = (page: ReactNode): ReactNode => <Header children={page} />;