import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Prediction = () => {
  const [fileName, setFileName] = useState('');
  const [fileURL, setFileURL] = useState(null);
  const [showFileDetails, setShowFileDetails] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [predictionResult, setPredictionResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);
  const dropContainerRef = useRef(null);
  const spinnerTimeoutRef = useRef(null);

  const supportedFileTypes = ['image/jpeg', 'image/png'];

  useEffect(() => {
    return () => {
      if (fileURL) {
        URL.revokeObjectURL(fileURL);
      }
      if (spinnerTimeoutRef.current) {
        clearTimeout(spinnerTimeoutRef.current);
      }
    };
  }, [fileURL]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && supportedFileTypes.includes(file.type)) {
      setFileName(file.name);
      setFileURL(URL.createObjectURL(file));
      setShowFileDetails(true);
      setSelectedFile(file);
      setErrorMessage('');
    } else {
      setErrorMessage('Please upload a supported image file (JPEG, PNG).');
      handleClearFile();
    }
  };

  const handleClearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (fileURL) {
      URL.revokeObjectURL(fileURL);
    }
    setFileName('');
    setFileURL(null);
    setShowFileDetails(false);
    setUploadStatus('');
    setPredictionResult('');
    setLoading(false);
    setShowSpinner(false);
    setSelectedFile(null);
    setErrorMessage('');
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    dropContainerRef.current?.classList.add('drag-active');
  };

  const handleDragLeave = () => {
    dropContainerRef.current?.classList.remove('drag-active');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    dropContainerRef.current?.classList.remove('drag-active');
    const file = event.dataTransfer.files[0];
    if (file && supportedFileTypes.includes(file.type)) {
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }
      setFileURL(URL.createObjectURL(file));
      setShowFileDetails(true);
      setSelectedFile(file);
      setErrorMessage('');
      setFileName(file.name);
    } else {
      setErrorMessage('Please upload a supported image file (JPEG, PNG).');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setErrorMessage("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile, fileName);

    setLoading(true);
    setShowSpinner(true);
    setPredictionResult('');
    setUploadStatus('');
    setErrorMessage('');

    spinnerTimeoutRef.current = setTimeout(() => {
      setShowSpinner(true);
    }, 500);

    try {
      const response = await axios.post('http://localhost:1001/predict', formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const data = response.data;

        if (spinnerTimeoutRef.current) {
          clearTimeout(spinnerTimeoutRef.current);
        }

        setLoading(false);
        setShowSpinner(false);
        setUploadStatus('Upload successful!');

        setTimeout(() => {
          if (data.predicted_class) {
            setPredictionResult(data.predicted_class);
          } else {
            setErrorMessage("Unexpected response format from server.");
          }
          setShowSpinner(false);
        }, 500);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      setLoading(false);
      setShowSpinner(false);
      setUploadStatus('Error uploading file. Please try again.');

      let errorMsg = 'An error occurred. Please try again later.';
      if (error.response) {
        if (error.response.status === 503) {
          errorMsg = 'Service is currently unavailable. Please try again later.';
        } else {
          errorMsg = error.response.data || 'An error occurred. Please try again later.';
        }
      } else if (error.message.includes('Network Error')) {
        errorMsg = 'This service has been stopped by the team, contact them to start this service.';
      }

      setErrorMessage(errorMsg);
    }
  };

  const dosAndDontsTumor = (
    <div className="dos-and-donts">
      <h3>Do's</h3>
      <ul className="Dos">
        <li>Seek medical advice immediately.</li>
        <li>Follow a treatment plan prescribed by a specialist.</li>
        <li>Maintain a healthy diet and stay hydrated.</li>
        <li>Stay positive and follow up regularly with your doctor.</li>
        <li>Engage in physical activity as recommended by your healthcare provider.</li>
      </ul>
      <h3>Don'ts</h3>
      <ul className="Donts">
        <li>Avoid self-medication without consulting a doctor.</li>
        <li>Don't ignore any new symptoms.</li>
        <li>Don't skip medical appointments.</li>
        <li>Avoid smoking and excessive alcohol consumption.</li>
        <li>Don't rely on unverified home remedies or alternative treatments without consulting a doctor.</li>
      </ul>
    </div>
  );

  const dosAndDontsNormal = (
    <div className="dos-and-donts">
      <h3>Do's</h3>
      <ul className="Dos">
        <li>Continue with regular check-ups.</li>
        <li>Maintain a healthy lifestyle.</li>
        <li>Stay physically active.</li>
        <li>Eat a balanced diet rich in fruits and vegetables.</li>
        <li>Stay informed about health updates and prevention measures.</li>
      </ul>
      <h3>Don'ts</h3>
      <ul className='Donts' >
        <li>Don't ignore future symptoms, even if they seem mild.</li>
        <li>Avoid processed foods and sugary drinks.</li>
        <li>Don't smoke or use tobacco products.</li>
        <li>Avoid excessive stress; practice relaxation techniques.</li>
        <li>Don't skip regular health screenings.</li>
      </ul>
    </div>
  );

  return (
    <section id="prediction" className="container">
      <div className="prediction">
        <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
          {!showFileDetails && (
            <>
              <span className="form-title">Upload your Pancreas MRI</span>
              <p className="form-paragraph">File should be a JPEG or PNG image</p>
              <label
                htmlFor="file-input"
                className="drop-container"
                ref={dropContainerRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                aria-describedby="file-input-description"
              >
                <span className="drop-title">Drop file here</span> or
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  required
                  id="file-input"
                  name="file"
                  className="file-input"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  aria-label="Choose a file to upload"
                />
              </label>
            </>
          )}
          {showFileDetails && (
            <div className="image-preview-container">
              <button
                type="button"
                className="clear-file"
                onClick={handleClearFile}
                aria-label="Clear selected file"
              >
                &times;
              </button>
              <img src={fileURL} alt={`Preview of ${fileName}`} className="image-preview" />
              <span className="file-name">{fileName}</span>
            </div>
          )}
          <button type="submit" className="button type1" disabled={!selectedFile || loading}>
            <span className="btn-txt">{loading ? 'Predicting...' : 'Predict'}</span>
          </button>
        </form>
        {uploadStatus && <><br /><p className="upload-status" aria-live="polite">{uploadStatus}</p></>}
        {showSpinner && <><br /><span className="loader"></span></>}
        {predictionResult && (
          <>
            <p className="prediction-result" aria-live="polite">Predicted Class: {predictionResult}</p>
            {predictionResult === 'tumor' ? dosAndDontsTumor : dosAndDontsNormal}
          </>
        )}
        {errorMessage && <p className="error-message" aria-live="assertive">{errorMessage}</p>}
      </div>
    </section>
  );
};

export default Prediction;
