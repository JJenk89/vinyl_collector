import { Link } from '@inertiajs/react';

const AuthPromptPage = ({ listType }: { listType: string }) => {
    return ( 
        <p className='font-mono min-h-screen'>
            Please <Link href='/register' className='underline text-indigo-600'>create an account</Link> or 
            <Link href='/login' className='underline text-indigo-600'>log in</Link> to create a {listType}!
        </p>
     );
}
 
export default AuthPromptPage;