import { Link } from '@inertiajs/react';

const AuthPrompt = () => {
    return ( 
        <p className="text-gray-300">Please <Link href="/login" className='text-indigo-600 underline'>log in</Link> or <Link href="/register" className='text-indigo-600 underline'>register</Link> to add to wishlist or collection</p>
     );
}
 
export default AuthPrompt;