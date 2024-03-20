import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import './Addbook.css';

const AddBook = () => {
    const [showAddBookForm, setShowAddBookForm] = useState(false);
    const [bookData, setBookData] = useState({
        book_id: '',
        title: '',
        author: '',
        description: '',
        category_id: '',
        added_by: '',
        Shelve_No: ''
    });
    const [display, setDisplay] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({
            ...bookData,
            [name]: value
        });
    };

    const addBook = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8801/books', bookData);
            setDisplay(true);
        } catch (error) {
            console.error('Error sending POST request:', error);
        }
    };

    const toggleAddBookForm = () => {
        setShowAddBookForm(!showAddBookForm);
    };

    return (
        <div className='container'>
            <Header />
            <h1 className='heading'>Add Book</h1>
            {display && <p className='success-message'>Book Added successfully!</p>}
            <hr />
            <div className='model' style={{ maxHeight: '320px', overflow: 'auto' }}>
                <form onSubmit={addBook} className='form'>
                    <div className='form-group'>
                        <input className='input' placeholder='Name:' type='text' name='book_id' value={bookData.book_id} onChange={handleChange} required />
                    </div>
                    <div className='form-group'>
                        <input className='input' placeholder='Title:' type='text' name='title' value={bookData.title} onChange={handleChange} required />
                    </div>
                    <div className='form-group'>
                        <input className='input' placeholder='Author:' type='text' name='author' value={bookData.author} onChange={handleChange} required />
                    </div>
                    <div className='form-group'>
                        <textarea className='textarea' placeholder='Description:' name='description' value={bookData.description} onChange={handleChange} required />
                    </div>
                    <div className='form-group'>
                        <input className='input' placeholder='Category:' type='text' name='category_id' value={bookData.category_id} onChange={handleChange} required />
                    </div>
                    <div className='form-group'>
                        <input className='input' placeholder='Added By:' type='text' name='added_by' value={bookData.added_by} onChange={handleChange} required />
                    </div>
                    <div className='form-group'>
                        <input className='input' type='text' placeholder='Shelve No:' name='Shelve_No' value={bookData.Shelve_No} onChange={handleChange} required />
                    </div>
                    <button type='submit' className='submit-button'>Add Book</button>
                </form>
            </div>
        </div>
    );
};

export default AddBook;
