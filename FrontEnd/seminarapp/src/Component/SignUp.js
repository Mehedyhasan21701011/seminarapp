import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateName = () => {
        const trimmedName = name.trim();
        const nameRegex = /^[A-Za-z\s]+$/;
        const minLength = 2;
        const maxLength = 30;

        if (!trimmedName) {
            return 'Name cannot be empty';
        }

        if (!nameRegex.test(trimmedName)) {
            return 'Name should contain only letters and spaces';
        }

        if (trimmedName.length < minLength || trimmedName.length > maxLength) {
            return `Name should be between ${minLength} and ${maxLength} characters`;
        }

        return '';
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = () => {
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
        } else {
            setPasswordError('');
        }
    };

    const validateForm = () => {
        const nameError = validateName();
        const emailError = validateEmail();
        const passwordError = validatePassword();

        if (nameError || emailError || passwordError) {
            setGeneralError('Please fix the form errors before submitting.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        if (!validateForm()) {
            return;
        }

        try {
            // Send POST request to the server
            const response = await axios.post('http://localhost:8801/users', { name, email, password });

            console.log('Server response:', response.data);
        } catch (error) {
            console.error('Error sending POST request:', error);
            setGeneralError('An error occurred during registration. Please try again.');
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const callAPI = () => {
        axios.get('http://localhost:8801/users').then((data) => {
            // This console.log will be in your frontend console
            console.log(data);
        });
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div style={{ textAlign: 'center' }} className='bg-white p-3 rounded w-30'>
                <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <input
                            className='form-controls rounded-0'
                            type='text'
                            value={name}
                            onChange={handleNameChange}
                            placeholder='Enter Name'
                        />
                        {isSubmitted && validateName() && (
                            <p className='text-danger'>{validateName()}</p>
                        )}
                    </div>
                    <div className='mb-3'>
                        <input
                            className='form-controls rounded-0'
                            type='text'
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={validateEmail}
                            placeholder='Enter email'
                        />
                        {isSubmitted && emailError && (
                            <p className='text-danger'>{emailError}</p>
                        )}
                    </div>
                    <div className='mb-3'>
                        <input
                            className='form-controls rounded-0'
                            type='password'
                            value={password}
                            onChange={handlePasswordChange}
                            onBlur={validatePassword}
                            placeholder='Enter password'
                        />
                        {isSubmitted && passwordError && (
                            <p className='text-danger'>{passwordError}</p>
                        )}
                    </div>
                    <button className='btn btn-success w-100'>
                        <strong>Sign Up</strong>
                    </button>
                    <p>You agree to our terms and conditions</p>
                    {isSubmitted && !generalError && (
                        <h3 style={{ textAlign: 'center' }}>Account Created Successfully</h3>
                    )}
                    {generalError && <p className='text-danger'>{generalError}</p>}
                    <Link to={'/'}>
                        <button onClick={callAPI} className='btn btn-default border w-100 bg-light rounded-0'>
                            <strong>Login</strong>
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
