import React, { useState } from 'react';
import styles from '../Components/Login.module.css'; // Import CSS module
import axios from 'axios';

const Login = () => {
  const [inputs, setInputs] = useState({
    companyname: '',
    companytype: '',
    registrationnumber: '',
    pannumber: '',
    gstnumber: '',
    firstname: '',
    lastname: '',
    designation: '',
    phonenumber: '',
    officialmail: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zipcode: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevstate) => ({ ...prevstate, [name]: value }));
  };

  const validateInputs = () => {
    const newErrors = {};

    // Validation logic
    if (!inputs.officialmail || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(inputs.officialmail)) {
      newErrors.officialmail = 'Invalid email address';
    }

    if (!inputs.phonenumber || !/^[0-9]{10}$/.test(inputs.phonenumber)) {
      newErrors.phonenumber = 'Phone number must be 10 digits';
    }

    if (!inputs.firstname || !/^[a-zA-Z]+$/.test(inputs.firstname)) {
      newErrors.firstname = 'First name must contain only letters';
    }

    if (!inputs.lastname || !/^[a-zA-Z]+$/.test(inputs.lastname)) {
      newErrors.lastname = 'Last name must contain only letters';
    }

    if (!inputs.pannumber || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(inputs.pannumber)) {
      newErrors.pannumber = 'Invalid PAN number';
    }

    if (!inputs.gstnumber || !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{3}$/.test(inputs.gstnumber)) {
      newErrors.gstnumber = 'Invalid GST number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateInputs()) {
      try {
        const response = await axios.post('http://localhost:5000/submit', inputs, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          alert('Data saved successfully!');
        } else {
          alert('Error saving data.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('There was an error saving the data.');
      }
    } else {
      console.log('Validation errors:', errors);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.login}>
        <form onSubmit={handleSubmit}>
          {/* Company Info Section */}
          <div className={styles.all}>
          <div className={styles.section}>
            <h1>Company Info:</h1>
            <label htmlFor="cmpname">Company Name:</label>
            <input
              type="text"
              id="cmpname"
              name="companyname"
              className={styles.input}
              onChange={handleChange}
            />

            <label htmlFor="cmptype">Company Type:</label>
            <input
              type="text"
              id="cmptype"
              name="companytype"
              className={styles.input}
              onChange={handleChange}
            />

            <label htmlFor="regnum">Registration Number:</label>
            <input
              type="text"
              id="regnum"
              name="registrationnumber"
              className={styles.input}
              onChange={handleChange}
            />

            <label htmlFor="pan">PAN Number:</label>
            <input
              type="text"
              id="pan"
              name="pannumber"
              className={styles.input}
              onChange={handleChange}
            />
            {errors.pannumber && <p className={styles.error}>{errors.pannumber}</p>}

            <label htmlFor="gst">GST Number:</label>
            <input
              type="text"
              id="gst"
              name="gstnumber"
              className={styles.input}
              onChange={handleChange}
            />
            {errors.gstnumber && <p className={styles.error}>{errors.gstnumber}</p>}
          </div>

          {/* Contact Details Section */}
          <div className={styles.section}>
            <h1>Contact Details:</h1>
            <label htmlFor="fname">First Name:</label>
            <input
              type="text"
              id="fname"
              name="firstname"
              className={styles.input}
              onChange={handleChange}
            />
            {errors.firstname && <p className={styles.error}>{errors.firstname}</p>}

            <label htmlFor="lname">Last Name:</label>
            <input
              type="text"
              id="lname"
              name="lastname"
              className={styles.input}
              onChange={handleChange}
            />
            {errors.lastname && <p className={styles.error}>{errors.lastname}</p>}

            <label htmlFor="designation">Designation:</label>
            <input
              type="text"
              id="designation"
              name="designation"
              className={styles.input}
              onChange={handleChange}
            />

            <label htmlFor="phno">Phone Number:</label>
            <input
              type="text"
              id="phno"
              name="phonenumber"
              className={styles.input}
              onChange={handleChange}
            />
            {errors.phonenumber && <p className={styles.error}>{errors.phonenumber}</p>}

            <label htmlFor="email">Official Email:</label>
            <input
              type="email"
              id="email"
              name="officialmail"
              className={styles.input}
              onChange={handleChange}
            />
            {errors.officialmail && <p className={styles.error}>{errors.officialmail}</p>}
          </div>

          {/* Address Details Section */}
          <div className={styles.section}>
            <h1>Address Details:</h1>
            <label htmlFor="add">Address:</label>
            <input
              type="text"
              id="add"
              name="address"
              className={styles.input}
              onChange={handleChange}
            />

            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              className={styles.input}
              onChange={handleChange}
            />

            <label htmlFor="state">State/Province/Region:</label>
            <input
              type="text"
              id="state"
              name="state"
              className={styles.input}
              onChange={handleChange}
            />

            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              className={styles.input}
              onChange={handleChange}
            />

            <label htmlFor="pin">Postal Code/Zip Code:</label>
            <input
              type="text"
              id="pin"
              name="zipcode"
              className={styles.input}
              onChange={handleChange}
            />
          </div>

          </div>
          
          {/* Submit Button */}
          <div className={styles.submitBtn}>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
