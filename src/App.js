import React, { useState } from 'react';
import { Form } from 'antd';
import axios from 'axios';
import UploadForm from './components/UploadForm';
import PredictionResult from './components/PredictionResult';
import FeedbackForm from './components/FeedbackForm';
import './App.css';

function App() {
  const [form] = Form.useForm();
  const [predictions, setPredictions] = useState(null);
  const [imageName, setImageName] = useState('');
  const [predictedClass, setPredictedClass] = useState('');

  const dummyPredictions = {
  mange: 75.23,
  ringworm: 15.5,
  flea_allergy_dermatitis: 6.3,
  atopic_dermatitis: 2.0,
  other: 1.0
};

  const handleSubmit = async (values) => {
    const imageFile = values.image;
    console.log("Image file selected:", imageFile);
    if (!imageFile) { 
      console.warn("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await axios.post("http://localhost:8080/api/predict", formData);
    const data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;

    setPredictions(data.predictions);
    setImageName(imageFile.name);

    const topPrediction = Object.entries(data.predictions).sort((a, b) => b[1] - a[1])[0][0];
    setPredictedClass(topPrediction);
    // setPredictedClass("ringworm"); 
  };

  return (
    <div className="App">
      <h2>Dog Skin Disease Predictor</h2>
      <UploadForm form={form} onSubmit={handleSubmit} />
      <PredictionResult predictions={dummyPredictions} />
      {predictedClass && (
        <FeedbackForm imageName={imageName} predictedClass={predictedClass} />
      )}
    </div>
  );
}

export default App;
