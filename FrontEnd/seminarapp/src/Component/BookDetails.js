import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookDetails.css'; // Import your CSS file
import BookIcon from '@material-ui/icons/Book';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BookDetails = () => {
    const [bookDetails, setBookDetails] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const showSameBook = (category) => {
        setSelectedCategory(category);
    };
    useEffect(() => {
        // Fetch book details here
        axios.get('http://localhost:8801/books')
            .then(response => {
                setBookDetails(response.data);
                // Extract distinct categories from bookDetails
                const distinctCategories = [...new Set(response.data.map(book => book.category_id))];
                setCategories(distinctCategories);
            })
            .catch(error => {
                console.error('Error fetching book details:', error);
            });
    }, []);

    const navigate = useNavigate();
    const handleBookIconClick = (bookId) => {
        navigate('/issuepage', { state: { bookId } });
    };
    const historyControl = (book_id) => {
        navigate('/history', { state: { book_id } });
    }

    return (
        <div className='container' style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ height: '315px', width: '200px', overflowX: 'auto' }}>
                {categories.map(cat => (
                    <div
                        onClick={() => showSameBook(cat)}
                        className="category-item"
                        key={cat}
                    >
                        <h5 style={{ color: 'black', textAlign: 'left' }}>{cat}</h5>
                        <hr />
                    </div>
                ))}
            </div>
            <div style={{ height: '315px', overflowX: 'auto' }}>
                <table className="book-table" style={{ width: '900px' }}>
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
                                <td style={{ cursor: 'pointer' }} onClick={() => historyControl(element.book_id)}>{element.book_id}</td>
                                <td>
                                    {Object.keys(bookDetails).filter(book => bookDetails[book].title === element.title).length}
                                </td>
                                <td>{element.Shelve_No}</td>
                                <td><Button onClick={() => handleBookIconClick(element.book_id)}><BookIcon /></Button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookDetails;
