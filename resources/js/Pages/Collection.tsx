import { Link } from "@inertiajs/react";
import Header from "../Layouts/Header";
import { ReactNode } from "react";

function Collection() {
    return ( 
        <>
            <div className="p-4 text-center">
                <h1 className="text-4xl font-black">My Vinyls</h1>
            </div>
        </>
     );
}

Collection.layout = (page: ReactNode): ReactNode => <Header children={page} />;

 
export default Collection;
