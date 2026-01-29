import { Link } from "@inertiajs/react";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const AuthComponent = () => {
    return ( 
        <div>
            <p className="m-4">Sign up to get started!</p>

            <PrimaryButton className="w-24">
                <Link href="/register">Register</Link>
            </PrimaryButton>

            <p className="m-4">Already have an account? Then log in below</p>

            <SecondaryButton className="w-24">
                <Link href="/login">Login</Link>
            </SecondaryButton>
        </div>
     );
}
 
export default AuthComponent;