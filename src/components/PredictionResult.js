import React from 'react';

const PredictionResult = ({ predictions }) => {
  if (!predictions) return null;

  return (
    <div className="results">
      <h3>Prediction Results</h3>
      <ul>
        {Object.entries(predictions).map(([disease, confidence]) => (
          <li key={disease}>
            <b>{disease.toUpperCase().replace("_", " ")}:</b> {confidence}%
            <div className="bar">
              <div style={{ width: `${confidence}%` }} className="bar-inner"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PredictionResult;
