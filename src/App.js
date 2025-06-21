import React, { useState } from 'react';
import axios from 'axios';
import UploadForm from './components/UploadForm';
import PredictionResult from './components/PredictionResult';
import FeedbackForm from './components/FeedbackForm';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [imageName, setImageName] = useState('');
  const [predictedClass, setPredictedClass] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    const response = await axios.post("http://localhost:8080/api/predict", formData);

    const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;

    setPredictions(data.predictions);
    setImageName(image.name);
    
    // pick top predicted class
    const topPrediction = Object.entries(data.predictions).sort((a, b) => b[1] - a[1])[0][0];
    setPredictedClass(topPrediction);
  };

  return (
    <div className="App">
      <h2>Dog Skin Disease Predictor</h2>
      <UploadForm onImageChange={handleImageChange} onSubmit={handleSubmit} />
      <PredictionResult predictions={predictions} />
      {predictedClass && (
        <FeedbackForm imageName={imageName} predictedClass={predictedClass} />
      )}
    </div>
  );
}

export default App;
