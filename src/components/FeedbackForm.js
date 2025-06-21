import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = ({ imageName, predictedClass }) => {
  const [feedback, setFeedback] = useState({
    isAccurate: true,
    comment: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/api/feedback', {
      imageName,
      predictedClass,
      isAccurate: feedback.isAccurate,
      comment: feedback.comment
    });
    alert('Feedback submitted!');
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <h4>Submit Feedback</h4>
      <label>
        Prediction Accurate?
        <select onChange={e => setFeedback({ ...feedback, isAccurate: e.target.value === 'true' })}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </label>
      <br />
      <textarea
        placeholder="Any comments?"
        onChange={e => setFeedback({ ...feedback, comment: e.target.value })}
      />
      <br />
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
