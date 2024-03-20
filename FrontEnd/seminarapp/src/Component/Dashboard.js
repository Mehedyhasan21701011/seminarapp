import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import './Stats.css';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import BookIcon from '@material-ui/icons/Book';
import Header from './Header';


const Dashboard = (props) => {


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

    const [bookInfo, setBookInfo] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8801/books')
            .then(response => {
                setBookInfo(response.data);
            })
            .catch(error => {
                console.error('Error fetching book details:', error);
            });
    }, []);


    const navigate = useNavigate();
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


    const seeTotalBook = () => {
        navigate('/bookinformation');
    }


    return (
        <div className='container dashboard-background '>
            <Header></Header>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', marginTop: '100px' }}>
                <div style={{ width: '300px', height: '100px', backgroundColor: 'tomato', marginLeft: '100px', borderRadius: '10px' }}>
                    <p style={{ color: 'whitesmoke', textAlign: 'center', marginTop: '20px' }}>"A library is a hospital for the mind"</p>
                </div>
                <div style={{ width: '300px', height: '100px', backgroundColor: '#F7941E', marginRight: '100px', borderRadius: '10px' }}>
                    <p style={{ color: 'whitesmoke', textAlign: 'center', marginTop: '20px' }}>"Turn the world into a library"</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
