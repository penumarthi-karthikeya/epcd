import React, { useState, useRef, useEffect } from 'react';

const Prediction = () => {
  const [fileName, setFileName] = useState('');
  const [fileURL, setFileURL] = useState(null);
  const [showFileDetails, setShowFileDetails] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [predictionResult, setPredictionResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorDetails, setErrorDetails] = useState('');
  const fileInputRef = useRef(null);
  const dropContainerRef = useRef(null);

  const supportedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];

  useEffect(() => {
    return () => {
      if (fileURL) {
        URL.revokeObjectURL(fileURL);
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
      setErrorDetails('');
    } else {
      setErrorDetails('Please upload a supported image file (JPEG, PNG, or GIF).');
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
    setSelectedFile(null);
    setErrorDetails('');
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
      setFileName(file.name);
      setFileURL(URL.createObjectURL(file));
      setShowFileDetails(true);
      setSelectedFile(file);
      setErrorDetails('');
    } else {
      setErrorDetails('Please upload a supported image file (JPEG, PNG, or GIF).');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!selectedFile) {
      setErrorDetails("No file selected.");
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile, fileName);
  
    setLoading(true); 
    setPredictionResult('');
    setUploadStatus('');
    setErrorDetails('');
  
    try {
      console.log("Sending request to http://localhost:1002/predict...");
      const response = await fetch('http://localhost:1002/predict', {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
      });
  
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
  
      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await response.json();
          console.log("Response received:", data);
          setLoading(false);
          setUploadStatus('Upload successful!');
          if (data.predicted_class) {
            setPredictionResult(data.predicted_class);
          } else {
            console.error("Unexpected response format:", data);
            setErrorDetails("Unexpected response format from server.");
          }
        } else {
          console.error("Unexpected content type:", contentType);
          setErrorDetails("Unexpected response type from server.");
        }
      } else {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
    } catch (error) {
      setLoading(false);
      setUploadStatus('Error uploading file. Please try again.');
      
      let errorMessage = error.message;
      if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Unable to connect to the server. Please check if the server is running and accessible.';
      }
      
      setErrorDetails(`Error details: ${errorMessage}`);
      console.error('Error:', error);
    }
  };

  return (
    <section id="prediction" className="container">
      <div className="prediction">
        <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
          {!showFileDetails && (
            <>
              <span className="form-title">Upload your Pancreas MRI</span>
              <p className="form-paragraph">File should be a JPEG, PNG, or GIF image</p>
              <br />
              <label htmlFor="file-input" className="drop-container" ref={dropContainerRef}
                onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
                aria-describedby="file-input-description">
                <span className="drop-title">Drop file here</span> or
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  required
                  id="file-input"
                  name="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  aria-label="Choose a file to upload"
                />
              </label>
              <p id="file-input-description" className="sr-only">
                Accepted file types are JPEG, PNG, and GIF. You can drag and drop a file here or click to select a file.
              </p>
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
          <br />
          <button type="submit" className="button type1" disabled={!selectedFile || loading}>
            <span className="btn-txt">{loading ? 'Predicting...' : 'Predict'}</span>
          </button>
        </form>
        {loading && <span className="loader" aria-label="Loading"></span>}
        {uploadStatus && <p className="upload-status" aria-live="polite">{uploadStatus}</p>}
        {predictionResult && <p className="prediction-result" aria-live="polite">Predicted Class: {predictionResult}</p>}
        {errorDetails && (
          <div className="error-details" aria-live="assertive">
            <p>{errorDetails}</p>
            <p>Troubleshooting steps:</p>
            <ol>
              <li>Ensure the backend server is running on http://localhost:1002</li>
              <li>Check if there are any error messages in the backend server logs</li>
              <li>Verify that your firewall is not blocking the connection</li>
              <li>Try accessing http://localhost:1002/predict directly in your browser</li>
              <li>Check the browser console for any CORS-related errors</li>
            </ol>
          </div>
        )}
      </div>
    </section>
  );
};

export default Prediction;