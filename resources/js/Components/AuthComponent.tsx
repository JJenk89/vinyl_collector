import { Link } from "@inertiajs/react";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const AuthComponent = () => {
    return ( 
        <div className="font-mono">
            <p className="m-4">Sign up to get started!</p>

            <PrimaryButton className="w-24">
                <Link className="mx-auto h-full flex items-center" href="/register">Register</Link>
            </PrimaryButton>

            <p className="m-4">Already have an account? Then log in below</p>

            <SecondaryButton className="w-24">
                <Link className="mx-auto h-full flex items-center justify-center" href="/login">Login</Link>
            </SecondaryButton>
        </div>
     );
}
 
export default AuthComponent;