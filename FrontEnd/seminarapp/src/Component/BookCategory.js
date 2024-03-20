import React from 'react';
import Header from './Header';
import BookDetails from './BookDetails';

const BookCategory = () => {
    return (
        <div className='container  '>
            <Header></Header>
            <div style={{ height: '100px', justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ textAlign: 'center' }}>CategorY</h1>
                <p style={{ textAlign: 'center' }}>To see history click <strong>ISBN</strong></p>
                <hr></hr>
            </div>
            <div>
                <div style={{ width: '100%' }}>
                    <BookDetails></BookDetails>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default BookCategory;