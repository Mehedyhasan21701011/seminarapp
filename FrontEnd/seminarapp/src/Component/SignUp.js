import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = () => {
        if (!name.trim()) {
            setError('Name cannot be empty');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Invalid email address');
            return false;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
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
            const response = await axios.post('http://localhost:8801/users', { name, email, password });
            console.log('Server response:', response.data);
            setError('');
        } catch (error) {
            console.error('Error sending POST request:', error);
            setError('An error occurred during registration. Please try again.');
        }
    };

    // const callAPI = () => {
    //     axios.get('http://localhost:8801/users').then((data) => {
    //         console.log(data);
    //     });
    // };

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
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter Name'
                        />
                    </div>
                    <div className='mb-3'>
                        <input
                            className='form-controls rounded-0'
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter email'
                        />
                    </div>
                    <div className='mb-3'>
                        <input
                            className='form-controls rounded-0'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter password'
                        />
                    </div>
                    <button className='btn btn-success w-100'><strong>Sign Up</strong></button>
                    <p>You agree to our terms and conditions</p>
                    {isSubmitted && !error && <h3 style={{ textAlign: 'center' }}>Account Created Successfully</h3>}
                    {error && <p className='text-danger'>{error}</p>}
                    <Link to={'/'}>
                        <button className='btn btn-default border w-100 bg-light rounded-0'>
                            <strong>Login</strong>
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
