import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './IssuePage.css';
import Header from './Header';

const Issue = () => {
    const location = useLocation();
    const [display, setDisplay] = useState(false);
    const bookId = location.state ? location.state.bookId : 'Book ID Not Available'; // Placeholder for invalid/missing bookId
    const [issueData, setIssueData] = useState({
        name: '',
        stu_id: '',
        isbn: bookId,
        branch: '',
        reference: '',
        year: ''
    });

    const handleIssueChange = (e) => {
        const { name, value } = e.target;
        setIssueData((prevIssueData) => ({
            ...prevIssueData,
            [name]: value
        }));
    };
    const handleIssueSubmit = async (e) => {
        e.preventDefault();
        const { name, stu_id, isbn, branch, reference, year } = issueData;
        try {
            const response = await axios.post('http://localhost:8801/book_issue', issueData);
            const response1 = await axios.post('http://localhost:8801/book_issue_log', {
                isbn, stu_id, name, reference
            });
            const response2 = await axios.post('http://localhost:8801/students', {
                stu_id, name, reference, branch, year, isbn
            });
        } catch (error) {
            console.error('Error issuing book:', error);
        } finally {
            setIssueData({
                name: '',
                stu_id: '',
                isbn: '',
                branch: '',
                reference: '',
                year: ''
            });
            setDisplay(true);
        }
    };

    return (
        <div className="container">
            <Header></Header>
            <h2 style={{ textAlign: 'center' }}>Book Issue</h2>
            {display && <p className='success-message'>Book Added successfully!</p>}
            <hr className="styled-hr"></hr>
            <div style={{ maxHeight: '350px', overflow: 'auto' }}>
                <div className='mb-3' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <input
                        onChange={handleIssueChange}
                        value={issueData.name}
                        style={{ margin: '8px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '250px' }}
                        type='text'
                        placeholder='Enter your name'
                        name='name'
                    />
                    <input required
                        onChange={handleIssueChange}
                        value={issueData.stu_id}
                        style={{ margin: '8px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '250px' }}
                        type='text'
                        placeholder='Student Id'
                        name='stu_id'
                    />
                    <input
                        onChange={handleIssueChange}
                        value={issueData.branch}
                        style={{ margin: '8px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '250px' }}
                        type='text'
                        placeholder='Branch'
                        name='branch'
                    />
                    <input
                        onChange={handleIssueChange}
                        value={issueData.reference}
                        style={{ margin: '8px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '250px' }}
                        type='text'
                        placeholder='Reference'
                        name='reference'
                    />
                    <input
                        onChange={handleIssueChange}
                        value={issueData.year}
                        style={{ margin: '8px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '250px' }}
                        type='text'
                        placeholder='year'
                        name='year'
                    />
                    <button
                        onClick={handleIssueSubmit}
                        style={{
                            margin: '8px',
                            padding: '10px',
                            borderRadius: '5px',
                            backgroundColor: 'steelblue',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Issue;
