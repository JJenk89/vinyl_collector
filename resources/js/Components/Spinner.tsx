const Spinner = () => {
    return ( 
        <>
            <dialog className="min-h-80 min-w-80 bg-neutral-950 border border-purple-900 text-gray-300 flex flex-col items-center justify-center p-4 rounded-lg">
                <div className=" animate-pulse" role="status">
                    <span className="font-mono text-xl ">Loading...</span>
                    <img src="/assets/Record.svg" alt="Spinner" />
                </div>
            </dialog>
        
        </>
     );
}
 
export default Spinner;