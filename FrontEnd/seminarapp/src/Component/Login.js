import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');


    const navigate = useNavigate();

    // console.log(email);
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

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8801/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log(data);

            if (data.success) {
                // Authentication successful, navigate to the dashboard
                navigate('/dashboard', { state: { Email: email } });
            } else {
                // Authentication failed, handle accordingly
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-120'>
            <div style={{ textAlign: 'center' }} className='bg-white p-3 rounded w-30'>
                <h1 style={{ textAlign: 'center' }}>Sign In</h1>
                <hr></hr>
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label><strong>Email</strong></label>
                        <br></br>
                        <input className='form-controls rounded-0' type='text' placeholder='Enter email' onChange={handleEmailChange} onBlur={validateEmail}></input>
                        {emailError && <p className="text-danger">{emailError}</p>}
                    </div>
                    <div className='mb-3'>
                        <label><strong>Password</strong></label>
                        <br></br>
                        <input className='form-controls rounded-0' type='password' placeholder='Enter password' onChange={handlePasswordChange} onBlur={validatePassword}></input>
                        {passwordError && <p className="text-danger">{passwordError}</p>}
                    </div>
                    <button type='submit' className='btn btn-success w-100'><strong>Login</strong></button>
                    <p>You agree to our terms and conditions</p>
                </form>
            </div>
        </div>
    );
};

export default Login;
