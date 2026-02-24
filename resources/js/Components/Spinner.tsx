const Spinner = () => {
    return ( 
        <>
            <div className="min-h-80 min-w-80 bg-neutral-950 text-gray-300 flex flex-col items-center justify-center p-4 rounded-lg"
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