import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import Header from './Header';
import './IssueInfo.css';
import { useNavigate } from 'react-router-dom';

const IssueInfo = () => {
    const [issueInfo, setIssueInfo] = useState([]);
    const [bookInfo, setBookInfo] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8801/book_issue_log');
            const response2 = await axios.get('http://localhost:8801/books');
            setIssueInfo(response.data);
            setBookInfo(response2.data);
        } catch (error) {
            console.error('Error fetching issue details:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const calculateReturnDate = (addedAtTimestamp) => {
        const addedDate = new Date(addedAtTimestamp);
        addedDate.setDate(addedDate.getDate() + 3); // Adding 3 days
        return addedDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    };

    const handleBookReturn = async (book_issue_id) => {
        try {
            const bookToReturn = issueInfo.find(issue => issue.book_issue_id === book_issue_id);
            if (!bookToReturn) {
                console.error(`Book with book_issue_id ${book_issue_id} not found.`);
                return;
            }

            const response = await fetch(`http://localhost:8801/book_issue_log/${book_issue_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                console.log(`Record with book_issue_id ${book_issue_id} deleted successfully.`);
                fetchData();
            } else {
                console.error(`Failed to delete record with book_issue_id ${book_issue_id}.`);
            }
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    const currentStatus = (book_issue_id) => {
        const filterIssueBook = issueInfo.filter(item => item.book_issue_id === book_issue_id);
        const filterBook = bookInfo.filter(item => item.book_id === book_issue_id);
        if (filterBook.length >= filterIssueBook.length) {
            return 'Available';
        } else {
            return 'Waiting';
        }
    }

    const navigate = useNavigate();
    const historyControl = (book_id) => {
        navigate('/history', { state: { book_id } });
    }

    return (
        <div className='container dashboard-background'>
            <Header></Header>
            <h1 style={{ textAlign: 'center' }}>Issue Info</h1>
            <p style={{ textAlign: 'center' }}>To see history click on <strong>ISBN</strong></p>
            <hr />
            <div className="table-container table-scroll" style={{ height: '315px' }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Student_id</th>
                            <th>Book_id</th>
                            <th>Issue_Date</th>
                            <th>Return_Date</th>
                            <th>Reference</th>
                            <th>Status</th>
                            <th>Return</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issueInfo.map(element => (
                            <tr key={element.issue_id}>
                                <td>{element.issue_by}</td>
                                <td>{element.student_id}</td>
                                <td onClick={() => historyControl(element.book_issue_id)}>{element.book_issue_id}</td>
                                <td>{element.time_stamp}</td>
                                <td>{calculateReturnDate(element.time_stamp)}</td>
                                <td>{element.reference}</td>
                                <td>{currentStatus(element.book_issue_id)}</td>
                                <td><Button onClick={() => handleBookReturn(element.book_issue_id)}>Return</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default IssueInfo;
