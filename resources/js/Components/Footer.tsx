const Footer = () => {
    return (
        <footer className="bg-neutral-950 text-gray-400 py-8 px-4 pt-8 mt-8 border-t border-purple-950  bottom-0">
            
            <div className="flex justify-center space-x-4 pb-4">

               
                <a href="https://www.instagram.com/jjenk_89" target="_blank"><img src="/assets/Instagram.svg" alt="Instagram Logo and link" height={35} width={35}/></a>

                <a href="https://jjenk89.dev" target="_blank"><img src="/assets/External.svg" alt="Link to JJenk Web Dev portfolio site" height={35} width={35}/></a>
            </div>
            <div className="max-w-7xl mx-auto font-mono text-xs text-center">
              
                <p className="">© {new Date().getFullYear()} JJenk89 Web Dev</p> 
                    
                <p>All rights reserved.</p>
            </div>
        </footer>
    );
}
 
export default Footer;