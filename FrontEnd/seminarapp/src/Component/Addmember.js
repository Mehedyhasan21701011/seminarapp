import React from 'react';
import Header from './Header';
import { useState } from 'react';
import axios from 'axios';


const Addmember = () => {
    const [display, setDisplay] = useState(false);
    const [member, setMember] = useState({
        name: '',
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMember({
            ...member,
            [name]: value
        });
    };
    const addMember = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8801/users', member);
            setDisplay(true);
        } catch (error) {
            console.error('Error sending POST request:', error);
        } finally {
            setMember({
                name: '',
                email: '',
                password: ''
            });
        }
    }
    return (
        <div className='container'>
            <Header></Header>
            <h1 className='heading'>Add Member</h1>
            {display && <p className='success-message'>Member Added successfully!</p>}
            <hr />
            <div className='model' style={{ maxHeight: '320px', overflow: 'auto' }}>
                <form onSubmit={addMember} className='form'>
                    <div className='form-group'>
                        <input className='input' placeholder='Name:' type='text' name='name' value={member.name} onChange={handleChange} required />
                    </div>
                    <div className='form-group'>
                        <input className='input' placeholder='Email:' type='text' name='email' value={member.email} onChange={handleChange} required />
                    </div>
                    <div className='form-group'>
                        <input className='input' placeholder='Password:' type='text' name='password' value={member.password} onChange={handleChange} required />
                    </div>
                    <button type='submit' className='submit-button'>Add</button>
                </form>
            </div>
        </div>
    );
};

export default Addmember;