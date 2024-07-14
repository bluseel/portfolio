import { useState } from 'react';
import stl from './Contact.module.css';
import fb from '/contact/fb.png'
import twitter from '/contact/twitter.png'
import github from '/contact/github.png'
import ln from '/contact/ln.png'
import whatsapp from '/contact/whatsapp.png'
import gmail from '/contact/gmail.png'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: '',
      email: '',
      message: '',
    };

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email is not valid';
    }

    if (!formData.message) {
      newErrors.message = 'Message is required';
    }

    if (newErrors.name || newErrors.email || newErrors.message) {
      setErrors(newErrors);
      return;
    }

    // Set the message indicating functionality is under development
    setSubmitMessage('This functionality is under working, till then contact me via socials apps');
  };

  return (
    <div className={stl.contactContainer}>
      <div className={stl.formSection}>
        <div className={stl.title}>CONTACT</div>
        <div className={stl.formContainer}>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                placeholder='Your Name'
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <p className={stl.error}>{errors.name}</p>}
            </div>
            <div>
              <input
                placeholder='Your Email'
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className={stl.error}>{errors.email}</p>}
            </div>
            <div>
              <textarea
                placeholder='Your message'
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
              />
              {errors.message && <p className={stl.error}>{errors.message}</p>}
            </div>
            <button type="submit">Submit</button>
          </form>
          {submitMessage && <p className={stl.submitMessage}>{submitMessage}</p>}
        </div>
      </div>

      <div className={stl.linksSection}>
        <div className={stl.title}>
          M E
        </div>
        <div className={stl.linksContainer}>
          <div className={stl.imageContainer}>
            <img src={fb} alt="" />
          </div>
          <div className={stl.imageContainer}>
            <img src={twitter} alt="" />
          </div>
          <div className={stl.imageContainer}>
            <img src={whatsapp} alt="" />
          </div>
          <div className={stl.imageContainer}>
            <img src={github} alt="" />
          </div>
          <div className={stl.imageContainer}>
            <img src={ln} alt="" />
          </div>
          <div className={stl.imageContainer}>
            <img src={gmail} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
