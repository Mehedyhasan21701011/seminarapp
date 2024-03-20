import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [search, setSearch] = useState('');
    const [userdisplay, setUserDisplay] = useState('block');
    const [showAddBookForm, setShowAddBookForm] = useState(false);
    const [searchDisplay, setSearchDisplay] = useState('block');
    const [bookInfo, setBookInfo] = useState([]);
    const [foundBook, setFoundBook] = useState(null);
    const [issueINFO, setIssueINFO] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);


    const toggleAddBookForm = () => {
        setShowAddBookForm(!showAddBookForm);
        setUserDisplay('none');
    };
    const pressBody = (e) => {
        setSearchDisplay('none');
    }

    useEffect(() => {
        axios.get('http://localhost:8801/books')
            .then(response => {
                setBookInfo(response.data);
            })
            .catch(error => {
                console.error('Error fetching book details:', error);
            });
    }, []);


    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearch(val);
        setFoundBook(null);

    };

    const handleSearchSubmit = (e) => {

        const foundBook = bookInfo.find(element => element.book_id.toString() === search.toString());

        // console.log(foundBook);

        if (foundBook) {
            setFoundBook(foundBook);
        } else {
            setFoundBook(null);
            console.log('Book not found');
        }
        e.preventDefault();
    };


    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    return (
        <div className='container dashboard-background '>
            <div className='HeaderPart' style={{ height: '100px', justifyContent: 'space-between', alignItems: 'center', display: 'flex', backgroundColor: '#D4CCCD', marginTop: '0px', borderRadius: '10px', padding: '10px', zIndex: '100' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '200px' }}>
                    <a style={{ padding: '10px', cursor: 'pointer', color: 'whitesmoke', marginLeft: '15px' }} onClick={toggleDropdown}>
                        <h6 style={{ backgroundColor: '#4682B4', marginTop: '10px', padding: '3px', borderRadius: '5px', width: '100px', textAlign: 'center' }}>ADMIN</h6>
                        {showDropdown && (
                            <div style={{ position: 'absolute', top: '100px', left: '0', backgroundColor: 'white', borderRadius: '5px', boxShadow: '0 0 5px rgba(0,0,0,0.3)', marginLeft: '178px' }}>
                                <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
                                    <li style={{ borderBottom: '1px solid #ccc' }}>
                                        <Link to="/admin/dashboard" style={{ display: 'block', padding: '10px 15px', color: '#333', textDecoration: 'none', transition: 'background-color 0.3s', borderRadius: '5px 5px 0 0' }}>Dashboard</Link>
                                    </li>
                                    <li style={{ borderBottom: '1px solid #ccc' }}>
                                        <Link to="/addbook" style={{ display: 'block', padding: '10px 15px', color: '#333', textDecoration: 'none', transition: 'background-color 0.3s', borderRadius: '0' }}>Add Books</Link>
                                    </li>
                                    <li style={{ borderBottom: '1px solid #ccc' }}>
                                        <Link to="/addmember" style={{ display: 'block', padding: '10px 15px', color: '#333', textDecoration: 'none', transition: 'background-color 0.3s', borderRadius: '0 0 5px 5px' }}>Add Members</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </a>
                    <Link to="/home" style={{ display: 'inline-block', margin: '10px' }}>
                        <strong style={{ color: 'black' }}>home</strong>
                    </Link>
                    <Link to="/bookcategory" style={{ display: 'inline-block', margin: '10px' }}>
                        <strong style={{ color: 'black' }}>bookCategory</strong>
                    </Link>
                    <Link to="/issueinfo" style={{ display: 'inline-block', margin: '10px' }}>
                        <strong style={{ color: 'black' }}>issueInfo</strong>
                    </Link>
                </div>

                <div style={{ marginLeft: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <form style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            style={{
                                width: '150px',
                                marginBottom: '3px',
                                padding: '8px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}
                            type="text"
                            placeholder="Search by ISBN..."
                            onChange={handleSearchChange}
                        />
                        <button type='submit'
                            style={{
                                marginLeft: '5px',
                                padding: '8px 12px',
                                borderRadius: '5px',
                                backgroundColor: 'steelblue',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                            onClick={handleSearchSubmit}
                        >Search
                        </button>
                    </form>

                    {foundBook && (
                        <div className="popup-table" style={{ backgroundColor: 'silver', marginTop: '200px', padding: '10px', borderRadius: '8px', zIndex: '100', display: searchDisplay }}>
                            <h1 style={{ textAlign: 'center', color: 'steelblue' }}>Book Information</h1>
                            <span onClick={pressBody} className='close ' style={{ textAlign: 'right' }}>&times;</span>
                            <table style={{ width: '100%' }}>
                                <thead style={{ backgroundColor: '#F2F2F2' }}>
                                    <tr>
                                        <th style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>Book ID</th>
                                        <th style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>Title</th>
                                        <th style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>Shelve</th>
                                        <th style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>Category</th>
                                        <th style={{ borderBottom: '1px solid #ccc' }}>Issued By</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>{foundBook.book_id}</td>
                                        <td style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>{foundBook.title}</td>
                                        <td style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>{foundBook.Shelve_No}</td>
                                        <td style={{ borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc' }}>{foundBook.category_id}</td>
                                        <td style={{ borderBottom: '1px solid #ccc' }}>
                                            {issueINFO.find(item => item.book_issue_id === foundBook.book_id) ?
                                                issueINFO.find(item => item.book_issue_id === foundBook.book_id).issue_by
                                                : 'NULL'}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    )}
                </div>

                <div>
                    <img style={{ height: '100px', width: '100px', borderRadius: '50%' }} src='favicon copy.jpg' alt='####'></img>
                </div>
            </div>
        </div>
    );
};

export default Header;