import React, { useEffect, useState } from 'react';

const Header = () => {
  const [activeTitle, setActiveTitle] = useState('Home'); // Default title based on active section

  useEffect(() => {
    const themeCheck = document.getElementById('theme_icon');

    const handleThemeChange = () => {
      document.body.classList.toggle('dark-theme');
    };

    // Function to update the document title with prefix
    const updateDocumentTitle = (title) => {
      document.title = `EPCD - ${title}`;
    };

    const handleScroll = () => {
      if (window.innerWidth >= 600) {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('ul li a');

        let index = sections.length;
        while (--index && window.scrollY + 100 < sections[index].offsetTop) { }

        // Update the active link and title based on the current section
        navLinks.forEach((link) => link.classList.remove('active'));
        if (navLinks[index]) {
          navLinks[index].classList.add('active');
          setActiveTitle(navLinks[index].textContent || 'Home'); // Update title based on active link text
        }
      }
    };

    const handleKeyPress = (event) => {
      if (event.altKey && event.key === 'a') {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Initialize the document title and add event listeners
    updateDocumentTitle(activeTitle);
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize active link state on load

    if (themeCheck) {
      themeCheck.addEventListener('change', handleThemeChange);
    }
    document.addEventListener('keypress', handleKeyPress);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (themeCheck) {
        themeCheck.removeEventListener('change', handleThemeChange);
      }
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [activeTitle]); // Dependency on activeTitle to update the document title

  return (
    <header>
      <nav>
        <a href="# ">
          <img src="./images/pancreas cancer.jpg" alt="Pancreatic Cancer Detection Logo" className="logo" />
        </a>
        <ul>
          <li><a href="# ">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#prediction">Prediction</a></li>
          <li><a href="#our_team">Our Team</a></li>
        </ul>
        <div className="icons">
          <div className="icon1">
            <label className="theme_icon">
              <input defaultChecked type="checkbox" id="theme_icon" aria-checked="mixed" />
              <svg viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg" className="moon">
                <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
              </svg>
              <svg viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg" className="sun">
                <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"></path>
              </svg>
            </label>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
