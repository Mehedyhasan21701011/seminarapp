import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';


const IssueInfo = () => {
    const [issueInfo, setIssueInfo] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8801/book_issue_log');
            setIssueInfo(response.data);
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
    // console.log(issueInfo);
    const url = 'http://localhost:8801/book_issue_log';

    const handleBookReturn = async (book_issue_id) => {
        try {
            // Send a DELETE request to the server with the book_issue_id in the URL
            const response = await fetch(`${url}/${book_issue_id}`, {
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
                // Handle error response
            }
        } catch (error) {
            console.error('Error deleting record:', error);
            // Handle fetch error
        }
    };



    return (
        <div style={{ marginTop: '0px', top: '0px' }}>
            <h2 style={{ textAlign: 'center' }}>ISSUED INFORMATION</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Student_id</th>
                        <th>Book_id</th>
                        <th>Issue_Date</th>
                        <th>Return_Date</th>
                        <th>Reference</th>
                        <th>Return</th>
                    </tr>
                </thead>
                <tbody>
                    {issueInfo.map(element => (
                        <tr key={element.issue_id}>
                            <td>{element.issue_by}</td>
                            <td>{element.student_id}</td>
                            <td>{element.book_issue_id}</td>
                            <td>{element.time_stamp}</td>
                            <td>{calculateReturnDate(element.time_stamp)}</td>
                            <td>{element.reference}</td>
                            <td><Button onClick={() => handleBookReturn(element.book_issue_id)}>Return</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default IssueInfo;
