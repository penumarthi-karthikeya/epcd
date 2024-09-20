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
      <h3><strong>Recommendations</strong></h3>
      <ul className="Dos">
        <li>Follow up regularly with your healthcare provider for ongoing assessment.</li>
        <li>Maintain a nutrient-rich diet tailored to support your overall health.</li>
        <li>Adhere strictly to prescribed treatment regimens and medications.</li>
        <li>Keep detailed records of your health status and any new symptoms.</li>
        <li>Prioritize mental health by incorporating stress-reduction techniques.</li>
      </ul>
      <br />
      <h3><strong>Advisories</strong></h3>
      <ul className="Donts">
        <li>Avoid delaying or missing scheduled medical consultations or treatments.</li>
        <li>Limit or eliminate alcohol and tobacco use to prevent complications.</li>
        <li>Refrain from strenuous physical activities unless approved by your physician.</li>
        <li>Avoid excessive intake of high-fat, high-sugar foods that may aggravate your condition.</li>
        <li>Do not disregard new or unusual symptoms; report them promptly to your healthcare provider.</li>
      </ul>
    </div>
  );

  const dosAndDontsNormal = (
    <div className="dos-and-donts">
      <h3><strong>Recommendations</strong></h3>
      <ul className="Dos">
        <li>Continue adhering to a balanced diet to promote long-term pancreatic health.</li>
        <li>Engage in regular, moderate physical activity for overall well-being.</li>
        <li>Schedule periodic medical check-ups to monitor your health proactively.</li>
        <li>Ensure proper hydration to support metabolic functions.</li>
        <li>Practice mindfulness and stress management techniques to maintain mental resilience.</li>
      </ul>
      <br />
      <h3><strong>Advisories</strong></h3>
      <ul className='Donts' >
        <li>Avoid excessive consumption of processed foods and unhealthy fats.</li>
        <li>Do not ignore early signs of gastrointestinal or abdominal discomfort.</li>
        <li>Abstain from smoking and limit alcohol intake to reduce future health risks.</li>
        <li>Stay committed to routine health assessments, even when feeling well.</li>
        <li>Refrain from self-medicating or using supplements without professional consultation.</li>
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
