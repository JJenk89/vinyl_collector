
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-neutral-950 text-gray-300 text-center">


                
          

            {header && (
                <header className="bg-neutral-950 shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            
                    <div className=" pb-1 pt-4">
                        <div className="px-4 mb-8">
                            <div className="text-xl font-medium text-green-600 mb-2">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-100">
                                {user.email}
                            </div>
                        </div>

                        <div className="flex justify-center m-3">
                            <Link 
                                className="border border-indigo-600 px-3 py-1 rounded text-gray-300 hover:bg-indigo-300 hover:text-neutral-950 transition"
                                href={route('profile.edit')}>
                                Edit Profile
                            </Link>
                            <Link
                                className="border border-red-500 ml-4 px-3 py-1 rounded text-gray-300 hover:bg-red-500 hover:text-neutral-950 transition"
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </Link>
                            <Link
                                className="border border-green-700 ml-4 px-3 py-1 rounded text-gray-300 hover:bg-green-300 hover:text-neutral-950 transition"
                                
                                href={'/'}
                                as="button"
                            >
                                Home
                            </Link>
                        </div>
                    </div>

            <main>{children}</main>
        </div>
    );
}