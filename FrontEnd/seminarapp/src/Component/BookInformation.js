import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const BookInformation = () => {
    const [bookInformation, setBookInformation] = useState([]);

    useEffect(() => {
        // Fetch book details here
        axios.get('http://localhost:8801/books')
            .then(response => {
                setBookInformation(response.data);
            })
            .catch(error => {
                console.error('Error fetching book details:', error);
            });
    }, []);

    return (
        <div style={{ minHeight: '100%', minWidth: '100%', overflow: 'auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Book Information</h1>
            <div style={{ overflowX: 'auto' }}>
                <Table striped bordered hover>
                    <thead style={{ backgroundColor: '#343a40', color: 'white', position: 'sticky', top: 0 }}>
                        <tr>
                            <th>Book ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category ID</th>
                            <th>Added By</th>
                            <th>Added Timestamp</th>
                            <th>Shelve No</th>
                            <th>Remove Book</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookInformation.map(book => (
                            <tr key={book.book_id}>
                                <td>{book.book_id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.category_id}</td>
                                <td>{book.added_by}</td>
                                <td>{book.added_at_timestamp}</td>
                                <td>{book.Shelve_No}</td>
                                <th style={{ color: 'brown' }}>Delete</th>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default BookInformation;
