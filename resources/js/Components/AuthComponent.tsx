import { Link } from "@inertiajs/react";

const AuthComponent = () => {
    return ( 
        <div>
            <p className="m-4">Sign up to get started!</p>
            <Link href="/register" className="bg-blue-800 text-white rounded p-2 hover:bg-blue-600">Register</Link>
            <p className="m-4">Already have an account? Then log in below</p>
            <Link href="/login" className="bg-blue-800 text-white rounded p-2 hover:bg-blue-600">Login</Link>
        </div>
     );
}
 
export default AuthComponent;