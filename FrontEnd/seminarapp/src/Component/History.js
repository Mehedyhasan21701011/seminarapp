import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'react-bootstrap';


const History = () => {
    const location = useLocation();
    const [allIssue, setAllIssue] = useState([]);


    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8801/api/data');
            setAllIssue(response.data);
        } catch (error) {
            console.error('Error fetching issue details:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);


    const bookId = location.state ? location.state.book_id : 'Book ID Not Available';

    const calculateReturnDate = (addedAtTimestamp) => {
        const addedDate = new Date(addedAtTimestamp);
        addedDate.setDate(addedDate.getDate() + 3); // Adding 3 days
        return addedDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    };
    return (
        <div className='container dashboard-background' >
            <Header></Header>
            <h1 style={{ textAlign: 'center' }}>History-{bookId}</h1>
            <hr></hr>
            <div className="table-container table-scroll">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Issue_Date</th>
                            <th>Name</th>
                            <th>Student Id</th>
                            <th>Book Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allIssue.map(element => (
                            bookId === element.book_id && (
                                <tr key={element.issue_id}>
                                    <td>{element.added_at_timestamp}</td>
                                    <td>{element.Name}</td>
                                    <td>{element.Student_Id}</td>
                                    <td>{element.title}</td>
                                </tr>
                            )
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default History;