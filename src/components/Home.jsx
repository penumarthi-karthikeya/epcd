export default function Home() {
  return (
    <section id="home" className="container hero">
      <div>
        <h1 className="hero-title"><span>Enhanced Pancreas Cancer Detection</span></h1>
        <div className="hero-content">
          <div className="hero-description">
            <div>
              <p>
                Discover the power of cutting-edge Dynamic Convolutional Networks to revolutionize the early detection of pancreatic cancer. Our advanced AI solutions provide unparalleled accuracy and insights, helping to save lives and improve patient outcomes.
                <br />
                <br />
              </p>
              <ul className="feature-list">
                <li>✨ <b>Early Detection:</ b> Identify potential pancreatic cancer risks at an early stage with high accuracy.</li>
                <li>🔍 <b>Advanced Analysis:</ b> Leverage dynamic convolutional networks for detailed and precise analysis of medical images.</li>
                <li>⚡ <b>Real-Time Insights:</ b> Receive immediate results to support timely decision-making and treatment planning.</li>
                <li>🛠️ <b>User-Friendly Interface:</ b> Easy-to-use tools and dashboards for both medical professionals and researchers.</li>
                <li>🌐 <b>Comprehensive Support:</ b> Access to a range of resources and support for seamless integration into existing workflows.</li>
              </ul>
              <br />
              <br />
            </div>
            <div className='hero-buttons'>
              <a href="#prediction" className="hero-button">Get Started</a>
              <a href="#about" className="hero-button">Discover Our Work</a>
              <a href="/epcd.apk" className="hero-button" download>Download APK</a>

            </div>
          </div>
          <div >
            <img className="hero-image" id="hero-image" src="/images/hero_image.jpeg" alt="Advanced AI and Detection" />
          </div>
        </div>
      </div>
    </section>


  );
}