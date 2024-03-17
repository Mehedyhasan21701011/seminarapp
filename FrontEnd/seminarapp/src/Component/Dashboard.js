import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import BookDetails from './BookDetails';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Footer from './Footer';
import './Stats.css';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import BookIcon from '@material-ui/icons/Book';


const Dashboard = (props) => {
    const [userdisplay, setUserDisplay] = useState('block');
    const [showAddBookForm, setShowAddBookForm] = useState(false);
    const [showIssueForm, setShowIssueForm] = useState(false);
    const [bookData, setBookData] = useState({
        book_id: '',
        title: '',
        author: '',
        description: '',
        category_id: '',
        added_by: '',
        adding_time: '',
        Shelve_No: ''
    });

    const toggleAddBookForm = () => {
        setShowAddBookForm(!showAddBookForm);
        setUserDisplay('none');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({
            ...bookData,
            [name]: value
        });
    };

    const addBook = async (e) => {
        e.preventDefault();
        const { book_id, title, author, description, category_id, added_by, adding_time, Shelve_No } = bookData;
        setUserDisplay('none');
        try {
            const response = await axios.post('http://localhost:8801/books', {
                book_id,
                title,
                author,
                description,
                category_id,
                added_by,
                adding_time,
                Shelve_No
            });
            const response1 = await axios.post('http://localhost:8801/book_categories', {
                category_id
            });

        } catch (error) {
            console.error('Error sending POST request:', error);
        }

        setBookData({
            book_id: '',
            title: '',
            author: '',
            description: '',
            category_id: '',
            added_by: '',
            adding_time: '',
            Shelve_No
        });
        setShowAddBookForm(false);
        setUserDisplay('block');
    };

    const [issueData, setIssueData] = useState({
        name: '',
        stu_id: '',
        isbn: '',
        branch: '',
        approve: '',
        year: ''
    });

    const handleIssue = (e) => {
        e.preventDefault();
        setShowIssueForm(!showIssueForm);
    };




    const handleIssueChange = (e) => {
        const { name, value } = e.target;
        setIssueData((prevIssueData) => ({
            ...prevIssueData,
            [name]: value
        }));
    };
    // console.log(issueData);

    const [user, setUser] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8801/users')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
    }, []);
    const userNames = user.map(person => person.name);

    const location = useLocation();
    const userEmail = location.state?.Email || 'No User';
    const EMAIL = userEmail.substring(0, 8);

    const [search, setSearch] = useState('');
    const [bookInfo, setBookInfo] = useState([]);
    const [foundBook, setFoundBook] = useState(null);

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


    const navigate = useNavigate();
    const handleIssueInfo = () => {
        navigate('\issueinfo');
    }

    const [searchDisplay, setSearchDisplay] = useState('block');
    const pressBody = (e) => {
        setSearchDisplay('none');
    }

    const [issueINFO, setIssueINFO] = useState([]);
    const [countbook, setCountBook] = useState(0);
    const [countIssue, setCountIssue] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8801/book_issue_log')
            .then(response => {
                setIssueINFO(response.data);
            })
            .catch(error => {
                console.error('Error fetching book details:', error);
            });
    }, []);

    useEffect(() => {
        setCountBook(bookInfo.length);
    }, [bookInfo]);

    useEffect(() => {
        setCountIssue(issueINFO.length);
    }, [issueINFO]);

    const [Reserve, setReserve] = useState(0);

    // Update Reserve when countbook or countIssue changes
    useEffect(() => {
        setReserve(countbook - countIssue);
    }, [countbook, countIssue]);

    const [countUser, setCountUser] = useState(0);

    useEffect(() => {
        setCountUser(user.length);
    }, [user]);


    const handelIssueOk = async (e) => {
        e.preventDefault();
        const { name, stu_id, isbn, branch, reference, year } = issueData;
        try {
            if (Reserve > 0) {
                const response = await axios.post('http://localhost:8801/book_issue', issueData);
                const response1 = await axios.post('http://localhost:8801/book_issue_log', {
                    isbn, stu_id, name, reference
                });
                const response2 = await axios.post('http://localhost:8801/students', {
                    stu_id, name, reference, branch, year, isbn
                });
                const response3 = await axios.post('http://localhost:8801/student_categories', {
                    branch
                });
            } else {
                console.log("ISsue Error");
            }

        } catch (error) {
            console.log(error);
        } finally {
            setIssueData({
                name: '',
                stu_id: '',
                isbn: ''
            });
        }
        setShowIssueForm(false);
    };
    // console.log(issueINFO);
    const seeTotalBook = () => {
        navigate('/bookinformation');
    }


    return (
        <div className='container dashboard-background '>
            <div className='HeaderPart' style={{ height: '150px', justifyContent: 'space-between', alignItems: 'center', display: 'flex', backgroundColor: 'black', marginTop: '0px', padding: '10px' }}>
                <div style={{ justifyContent: 'space-between' }}>
                    <a style={{ padding: '10px', cursor: 'pointer', color: 'whitesmoke' }} onClick={toggleAddBookForm}><strong>ADD BOOK</strong></a>
                    <Link to="/issueinfo"><strong>Issue Info</strong></Link>
                    <a style={{ padding: '10px' }} href='#'><strong>Learn</strong></a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <form style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            style={{
                                width: '200px',
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

                <div className='' style={{ textAlign: 'center', color: 'white' }}>
                    <div style={{ border: '3px solid whitesmoke', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto', animation: 'pulse 2s infinite' }}>
                        <img src='https://t4.ftcdn.net/jpg/04/83/90/95/240_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg' alt='Profile' style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '50%' }} />
                    </div>

                    <h5>{EMAIL}</h5>
                </div>

            </div>
            <div style={{ height: '150px' }}>
                <div className='stats'>
                    <div className='stats-block' onClick={seeTotalBook} >
                        <LibraryBooksIcon className='stats-icon' style={{ fontSize: 80 }} />
                        <p className='stats-title'>Total Books</p>
                        <p className='stats-count'>{countbook}</p>
                    </div>
                    <div className='stats-block'>
                        <LocalLibraryIcon className='stats-icon' style={{ fontSize: 80 }} />
                        <p className='stats-title'>Total Members</p>
                        <p className='stats-count'>{countUser}</p>
                    </div>
                    <div className='stats-block'>
                        <BookIcon className='stats-icon' style={{ fontSize: 80 }} />
                        <p className='stats-title'>Reservations</p>
                        <p className='stats-count'>{Reserve}</p>
                    </div>
                </div>
            </div>

            <div className='BodyPart ' style={{ width: '500px', height: "600px", display: 'flex', textAlign: 'center', justifyContent: 'space-between', margin: '120px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {showAddBookForm && (
                        <div className='model'>
                            <div className='modal-content' style={{ textAlign: 'center', backgroundColor: '#8FC4E9', height: '400px', overflowX: 'auto' }}>
                                <span className='close ' style={{ textAlign: 'right' }} onClick={toggleAddBookForm}>&times;</span>
                                <form onSubmit={addBook}>
                                    <label>Book ID:</label>
                                    <input type='text' name='book_id' value={bookData.book_id} onChange={handleChange} required /><br></br>

                                    <label>Title:</label>
                                    <input type='text' name='title' value={bookData.title} onChange={handleChange} required /><br></br>

                                    <label>Author:</label>
                                    <input type='text' name='author' value={bookData.author} onChange={handleChange} required /><br></br>

                                    <label>Description:</label>
                                    <textarea name='description' value={bookData.description} onChange={handleChange} required /><br></br>

                                    <label>Category_ID:</label>
                                    <input type='text' name='category_id' value={bookData.category_id} onChange={handleChange} required /><br></br>

                                    <label>Added by:</label>
                                    <input type='text' name='added_by' value={bookData.added_by} onChange={handleChange} required /><br></br>

                                    <label>Shelve_No:</label>
                                    <input type='text' name='Shelve_No' value={bookData.Shelve_No} onChange={handleChange} required /><br></br>

                                    <button type='submit'>Add Book</button><br></br>
                                </form>
                            </div>
                        </div>
                    )}


                    <div className='' style={{ minWidth: '400px', height: '580px', margin: '5px' }}>
                        <h2 style={{ textAlign: 'left', color: 'whitesmoke' }}>Book Category</h2>
                        <hr style={{ color: 'whitesmoke', boxShadow: '5px 1px' }}></hr>
                        <BookDetails></BookDetails>
                    </div>
                    <div className='' style={{ minWidth: '400px', margin: '5px', color: 'whitesmoke', margin: '5px' }}>
                        <h2>Issue Book</h2>
                        <p>If you want to issue a book</p>
                        <button onClick={handleIssue}>
                            {showIssueForm ? 'Cancel' : 'Issue'}
                        </button>
                        <hr style={{ color: 'whitesmoke', boxShadow: '5px 1px' }}></hr>
                        {
                            showIssueForm && (
                                <div style={{ height: '200px', overflowX: 'auto' }}>
                                    <div className='mb-3' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <input
                                            onChange={handleIssueChange}
                                            style={{ margin: '8px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '250px' }}
                                            type='text'
                                            placeholder='Enter your Name'
                                            value={issueData.name}
                                            name='name'
                                        />
                                        <input
                                            value={issueData.stu_id}
                                            onChange={handleIssueChange}
                                            style={{ margin: '8px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '250px' }}
                                            type='text'
                                            placeholder='Student Id'
                                            name='stu_id'
                                        />
                                        <input
                                            value={issueData.isbn}
                                            onChange={handleIssueChange}
                                            style={{ margin: '8px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '250px' }}
                                            type='text'
                                            placeholder='ISBN'
                                            name='isbn'
                                        />
                                        <input
                                            value={issueData.branch}
                                            onChange={handleIssueChange}
                                            style={{ margin: '8px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '250px' }}
                                            type='text'
                                            placeholder='Branch'
                                            name='branch'
                                        />
                                        <input
                                            value={issueData.reference}
                                            onChange={handleIssueChange}
                                            style={{ margin: '8px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '250px' }}
                                            type='text'
                                            placeholder='Reference'
                                            name='reference'
                                        />
                                        <input
                                            value={issueData.year}
                                            onChange={handleIssueChange}
                                            style={{ margin: '8px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '250px' }}
                                            type='text'
                                            placeholder='year'
                                            name='year'
                                        />
                                        <button
                                            onClick={handelIssueOk}
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
                                            OK
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

            </div>
            <div className='FooterPart' style={{ height: '400px' }}>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Dashboard;
