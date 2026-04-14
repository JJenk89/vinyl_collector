const Spinner = () => {
    return ( 
        <>
            <div className="h-screen min-w-full bg-neutral-950 bg-opacity-90 text-gray-300 flex flex-col items-center justify-center p-4 rounded-lg z-50 absolute top-0 left-0"
                role="status"
                aria-label="loading search data">
                <div className=" animate-pulse" role="status">
                    <span className="font-mono text-xl ">Loading...</span>
                    <img src="/assets/Record.svg" alt="Spinner" />
                </div>
            </div>
        
        </>
     );
}
 
export default Spinner;