import { useState, useEffect } from 'react';

const ScrollToTop = () => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    if (!isVisible) {
        return null;
    }

    return ( 
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-4 right-4 p-2 bg-neutral-950 bg-opacity-10 border border-violet-900 text-white rounded-md shadow-lg hover:bg-violet-800 transition-colors duration-300">
            △ Top
        </button>
     );
}
 
export default ScrollToTop;