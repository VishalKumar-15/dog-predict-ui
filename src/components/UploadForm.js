import React from 'react';

const UploadForm = ({ onImageChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="upload-form">
    <input type="file" accept="image/*" onChange={onImageChange} required />
    <button type="submit">Predict</button>
  </form>
);

export default UploadForm;
