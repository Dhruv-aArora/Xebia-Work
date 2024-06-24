import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const App = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: ''
  });
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date[0] });
  };

  const is18YearsOldOrAbove = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const handleSubmitPersonal = (e) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.dob) {
      const age = is18YearsOldOrAbove(formData.dob);
      if (age >= 18) {
        setProgress(50); // Fill the progress bar to 50%
      } else {
        alert('You must be 18 years or older.');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div>
      <div className="progress-bars">
        <div className="progress-section">
          <div className={`progress-bar ${progress >= 50 ? 'filled' : ''}`} id="progress-bar-1">
            <div className="progress" id="progress1" style={{ width: `${progress}%` }}></div>
          </div>
          <label htmlFor="progress1">Personal Details</label>
        </div>
        <div className="progress-section">
          <div className={`progress-bar`} id="progress-bar-2">
            <div className="progress" id="progress2" style={{ width: '0%' }}></div>
          </div>
          <label htmlFor="progress2">Account Info</label>
        </div>
        <div className="progress-section">
          <div className={`progress-bar`} id="progress-bar-3">
            <div className="progress" id="progress3" style={{ width: '0%' }}></div>
          </div>
          <label htmlFor="progress3">Other Info</label>
        </div>
      </div>
      <br /><br /><br /><br /><br />
      <div className="text" id="journey-text">
        <div className="text1">Your savings journey starts from here</div>
        <br />
        <div className="text2">Set up your <span style={{ color: 'purple' }}>Easy access account</span></div>
      </div>
      <hr style={{ width: '50%', margin: '15px auto' }} />

      <div className="container">
        <div className="box">
          <form id="personal-form" onSubmit={handleSubmitPersonal}>
            <div className="header">
              <div className="num">01</div>
              <div className="per">Personal Details</div>
            </div>
            <br />
            <p>Tell us a bit about yourself</p>
            <br />
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="middleName">Middle Name (Optional)</label>
              <input
                type="text"
                id="middleName"
                placeholder="Middle Name"
                value={formData.middleName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date Of Birth</label>
              <Flatpickr
                id="dob"
                value={formData.dob}
                onChange={handleDateChange}
                options={{ dateFormat: 'd-m-Y' }}
                placeholder="DD-MM-YYYY"
                required
              />
            </div>
            <button type="submit" id="btn">Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
