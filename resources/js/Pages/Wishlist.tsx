import Header from "@/Layouts/Header";
import { ReactNode } from "react";

function Wishlist() {
    return ( 
        <>
            <div className="p-4 text-center">
                <h1 className="text-4xl font-black">My Wishlist</h1>
            </div>
        </>
     );
}

Wishlist.layout = (page: ReactNode): ReactNode => <Header children={page} />;

 
export default Wishlist;