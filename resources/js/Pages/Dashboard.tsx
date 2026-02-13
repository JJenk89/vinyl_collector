import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Header from '@/Layouts/Header';
import { Head, Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';


export default function Dashboard() {

    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-300 bg-neutral-950">
                    {user.name}'s Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-4 lg:px-8">

                        <div className="p-4 text-gray-300">
                            You're logged in!
                        </div>
                   
                  
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

Dashboard.layout = (page: ReactNode): ReactNode => <Header children={page} />;