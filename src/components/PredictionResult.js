import React from 'react';
import './PredictionResult.css'; // Make sure to style nicely

const PredictionResult = ({ predictions }) => {
  if (!predictions) return null;

  return (
    <div className="results">
      <h3>Prediction Results</h3>
      <ul>
        {Object.entries(predictions).map(([disease, confidence]) => (
          <li key={disease} className="prediction-item">
            <div className="label">
              <b>{disease.toUpperCase().replace(/_/g, " ")}:</b> {confidence.toFixed(2)}%
            </div>
            <div className="bar">
              <div
                className="bar-inner"
                style={{
                  width: `${confidence}%`,
                  backgroundColor: confidence > 70 ? "#52c41a" : confidence > 40 ? "#faad14" : "#f5222d",
                }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PredictionResult;
