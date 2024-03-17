import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookDetails.css';  // Import your CSS file
import BookIcon from '@material-ui/icons/Book';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Issue from './IssuePage';

const BookDetails = () => {
    const [bookDetails, setBookDetails] = useState([]);
    const [issueDetails, setIssueDetails] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [total, setTotal] = useState(0);

    const showSameBook = (category) => {
        setSelectedCategory(category);
    };

    const closePopup = () => {
        setSelectedCategory(null);
    };

    useEffect(() => {
        // Fetch book details here
        axios.get('http://localhost:8801/books')
            .then(response => {
                setBookDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching book details:', error);
            });
    }, []);

    useEffect(() => {
        if (bookDetails.length > 0) {
            // Extract distinct categories from bookDetails
            const distinctCategories = [...new Set(bookDetails.map(book => book.category_id))];
            setCategories(distinctCategories);
        }
    }, [bookDetails]);
    const navigate = useNavigate();
    const handleBookIconClick = (bookId) => {
        navigate('/issue', { state: { bookId } });

    };

    useEffect(() => {
        // Fetch book details here
        axios.get('http://localhost:8801/book_issue_log')
            .then(response => {
                setIssueDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching book details:', error);
            });
    }, []);


    return (
        <div style={{ height: '300px', overflowX: 'auto' }}>
            {categories.map(cat => (
                <div
                    onClick={() => showSameBook(cat)}
                    className="category-item"
                    key={cat}
                >
                    <h5 style={{ color: 'whitesmoke', textAlign: 'left' }}>{cat}</h5>
                    <hr />
                </div>
            ))}

            {selectedCategory && (
                <div className="popup" style={{ backgroundColor: '#8FC4E9' }}>
                    <button onClick={closePopup}>Close</button>
                    <h3>Category: {selectedCategory}</h3>
                    <hr />
                    <table className="book-table">
                        <thead>
                            <tr>
                                <th>Book Title</th>
                                <th>ISBN</th>
                                <th>Total</th>
                                <th>Shelve No</th>
                                <th>ISSUED</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(bookDetails.reduce((acc, curr) => {
                                if (curr.category_id === selectedCategory) {
                                    acc[curr.title] = acc[curr.title] || curr;
                                }
                                return acc;
                            }, {})).map((element, index) => (
                                <tr key={index}>
                                    <td>{element.title}</td>
                                    <td>{element.book_id}</td>
                                    <td>
                                        {Object.keys(bookDetails).filter(book => bookDetails[book].title === element.title).length - total}
                                    </td>
                                    <td>{element.Shelve_No}</td>
                                    <td><Button onClick={() => handleBookIconClick(element.book_id)}><BookIcon /></Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BookDetails;
