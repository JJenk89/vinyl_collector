const ScrollToTop = () => {
    return ( 
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-4 right-4 p-2 bg-neutral-950 bg-opacity-10 border border-violet-900 text-white rounded-md shadow-lg hover:bg-violet-800 transition-colors duration-300">
            △ Top
        </button>
     );
}
 
export default ScrollToTop;