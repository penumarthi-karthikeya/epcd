import { useState, useEffect } from 'react';

export default function Mobilenavbar() {
    const [activeLink, setActiveLink] = useState('home');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            let index = sections.length;

            while (--index && window.scrollY + 100 < sections[index].offsetTop) { }

            const currentSectionId = sections[index]?.id;

            // Set the active link based on the current section
            switch (currentSectionId) {
                case 'home':
                    setActiveLink('home');
                    break;
                case 'about':
                    setActiveLink('about');
                    break;
                case 'prediction':
                    setActiveLink('prediction');
                    break;
                case 'contact':
                    setActiveLink('contact');
                    break;
                default:
                    setActiveLink('home'); // Default to home if no section matches
            }

            // Update the document title with the prefix
            document.title = `EPCP - ${capitalizeFirstLetter(currentSectionId || 'home')}`;
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initialize active link and title on load

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Helper function to capitalize the first letter of a string
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className="mobile-nav">
            <a
                href="#home"
                className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
                onClick={() => handleLinkClick('home')}
            >
                <div className="icon-text">
                    <svg className="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M3 12L12 4l9 8v7a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5h-4v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-7z" stroke="currentColor" fill="none" />
                    </svg>
                    <span>Home</span>
                </div>
            </a>

            <a
                href="#about"
                className={`nav-link ${activeLink === 'about' ? 'active' : ''}`}
                onClick={() => handleLinkClick('about')}
            >
                <div className="icon-text">
                    <svg className="nav-icon" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm1 5h-2v6h2v-6z" />
                    </svg>
                    <span>About</span>
                </div>
            </a>

            <a
                href="#prediction"
                className={`nav-link ${activeLink === 'prediction' ? 'active' : ''}`}
                onClick={() => handleLinkClick('prediction')}
            >
                <div className="icon-text">
                    <svg className="nav-icon" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M4 18v-4h4v4H4zm6 0v-7h4v7h-4zm6 0v-10h4v10h-4zM2 20h20v2H2v-2z" />
                    </svg>
                    <span>Prediction</span>
                </div>
            </a>

            <a
                href="#contact"
                className={`nav-link ${activeLink === 'contact' ? 'active' : ''}`}
                onClick={() => handleLinkClick('contact')}
            >
                <div className="icon-text">
                    <svg className="nav-icon" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-1.2 2L12 11.5 5.2 6h13.6zM4 18V8.3l8 5 8-5V18H4z" />
                    </svg>
                    <span>Our Team</span>
                </div>
            </a>
        </div>
    );
}
