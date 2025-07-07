import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    email: '',
    course: '',
    paymentInfo: { cardNumber: '', expiry: '', cvv: '' },
    completed: false
  });
  const [message, setMessage] = useState('');

  // Load saved data on email change
  useEffect(() => {
    if (form.email) {
      axios.get(`http://localhost:5000/api/registrations?search=${form.email}`)
        .then(res => {
          const existing = res.data.find(r => r.email === form.email);
          if (existing && !existing.completed) {
            setForm(existing);
          }
        });
    }
  }, [form.email]);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name in form.paymentInfo) {
      setForm(prev => ({
        ...prev,
        paymentInfo: { ...prev.paymentInfo, [name]: value }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const saveProgress = async (complete = false) => {
    try {
      const res = await axios.post('http://localhost:5000/api/register-course', {
        ...form,
        completed: complete
      });
      if (complete) setMessage('Registration submitted successfully!');
    } catch (err) {
      if (err.response?.data?.message === 'User already exists') {
        setMessage('User already registered.');
      }
    }
  };

  const handleSubmit = async () => {
    await saveProgress(true);
  };

  return (
    <div>
      {message && <p>{message}</p>}
      {step === 1 && (
        <div>
          <h3>Step 1: Personal Info</h3>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <button onClick={nextStep}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h3>Step 2: Course Selection</h3>
          <select name="course" value={form.course} onChange={handleChange}>
            <option value="">Select Course</option>
            <option value="React Basics">React Basics</option>
            <option value="Node.js Mastery">Node.js Mastery</option>
            <option value="Fullstack Development">Fullstack Development</option>
          </select>
          <button onClick={prevStep}>Back</button>
          <button onClick={nextStep}>Next</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h3>Step 3: Payment Info</h3>
          <input name="cardNumber" placeholder="Card Number" value={form.paymentInfo.cardNumber} onChange={handleChange} />
          <input name="expiry" placeholder="Expiry Date" value={form.paymentInfo.expiry} onChange={handleChange} />
          <input name="cvv" placeholder="CVV" value={form.paymentInfo.cvv} onChange={handleChange} />
          <button onClick={prevStep}>Back</button>
          <button onClick={nextStep}>Next</button>
        </div>
      )}
      {step === 4 && (
        <div>
          <h3>Step 4: Review and Submit</h3>
          <pre>{JSON.stringify(form, null, 2)}</pre>
          <button onClick={prevStep}>Back</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
      {!form.completed && (
        <button onClick={() => saveProgress(false)}>Save Progress</button>
      )}
    </div>
  );
}

export default MultiStepForm;
