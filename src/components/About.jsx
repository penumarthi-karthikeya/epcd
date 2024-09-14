
export default function About() {
  return (
    <section id="about" className="container about">
      <div className="about-div">
        <div className="gallery">
          <p className="gallery_name">Results Gallery</p>
          <ol className="gallery_slider">
            <img src="images/Confusion_matrix.png" alt="" loading="lazy" className="gallery-image" />
            <img src="images/cr,logloss,acc,f1score.png" alt="" loading="lazy" className="gallery-image" />
            <img src="images/train_graph.png" alt="" loading="lazy" className="gallery-image" />
          </ol>
        </div>
        <div className="about-content">
          <h2>About This Project</h2>
          <br />
          <p>
            <strong>Enhanced Pancreas Detection using Dynamic ConvNets (EPCD)</strong> is a cutting-edge project focused on improving the early detection of pancreatic cancer using advanced machine learning techniques. The project leverages convolutional neural networks (ConvNets) trained on medical imaging data to help medical professionals identify abnormalities in the pancreas that could indicate cancer.
          </p>
          <br />

          <h3>Our Model</h3>
          <p>
            The backbone of this project is a TensorFlow-based convolutional neural network model that has been specifically designed to analyze medical imaging data such as CT scans. The model has been trained on a carefully curated dataset to ensure high accuracy(95.87%) in detecting early signs of pancreatic cancer.
          </p>
          <br />

          <h3>Technologies Used</h3>
          <ul>
            <li><span>✔ </span><strong>Machine Learning Framework:</strong>
              <a href="https://www.google.com/search?q=TensorFlow" target="_blank" rel="noreferrer">TensorFlow</a>
            </li>
            <li><span>✔ </span><strong>Image Processing:</strong>
              <a href="https://www.google.com/search?q=Pillow" target="_blank" rel="noreferrer">Pillow</a>
            </li>
            <li><span>✔ </span><strong>Frontend:</strong>
              <a href="https://www.google.com/search?q=React+framework" target="_blank" rel="noreferrer">React</a>,
              <a href="https://www.google.com/search?q=HTML5" target="_blank" rel="noreferrer">HTML5</a>,
              <a href="https://www.google.com/search?q=CSS3" target="_blank" rel="noreferrer">CSS3</a>,
              <a href="https://www.google.com/search?q=JavaScript" target="_blank" rel="noreferrer">JavaScript</a>
            </li>
            <li><span>✔ </span><strong>Backend:</strong>
              <a href="https://www.google.com/search?q=Flask+API" target="_blank" rel="noreferrer">Flask for the API</a>,
              <a href="https://www.google.com/search?q=TensorFlow+model" target="_blank" rel="noreferrer">TensorFlow model</a>
            </li>
            <li><span>✔ </span><strong>Deployment:</strong>
              <a href="https://www.google.com/search?q=Vercel" target="_blank" rel="noreferrer">Vercel (frontend)</a>,
              <a href="https://www.google.com/search?q=Render" target="_blank" rel="noreferrer">Render (Flask API backend)</a>
            </li>
          </ul>

          <br />

          <h3>Key Features</h3>
          <ul>
            <li>Real-time prediction of pancreatic cancer risk from uploaded medical images</li>
            <li>Fast inference using TensorFlow Lite for web and mobile compatibility</li>
            <li>Dark mode support for ease of use during night-time analysis</li>
          </ul>
          <br />
        </div>
      </div>
    </section>
  );

}