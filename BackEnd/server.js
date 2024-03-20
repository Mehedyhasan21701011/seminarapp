const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const db1 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'library'
});

db1.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

app.post('/books', (req, res) => {
    const data = {
        book_id: req.body.book_id,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        category_id: req.body.category_id,
        added_by: req.body.added_by,
        Shelve_No: req.body.Shelve_No
    };
    const sql1 = 'INSERT INTO books SET ?';

    db1.query(sql1, data, (err, results) => {
        if (err) {
            console.error('Error inserting data into the "books" table:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // Sending the response
        console.log('success db1');
        res.status(200).json({ status: 200, error: null, response: results });
    });

});

app.post('/book_categories', (req, res) => {
    const data2 = {
        category_id: req.body.category_id,
    };
    const sql2 = 'INSERT INTO book_categories SET ?';

    db1.query(sql2, data2, (err, results) => {
        if (err) {
            console.error('Error inserting data into the "books" table:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // Sending the response
        console.log('success db1');
        res.status(200).json({ status: 200, error: null, response: results });
    });

});

app.post('/users', (req, res) => {
    const { email, password } = req.body;
    db1.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        } else if (result.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Invalid email or password' });
        }
    });
});

app.post('/book_issue', (req, res) => {
    const data = {
        name: req.body.name,
        Student_id: req.body.stu_id,
        book_id: req.body.isbn,
        branch: req.body.branch,
        reference: req.body.reference
    };

    const sql = 'INSERT INTO book_issue SET ?';

    db1.query(sql, data, (err, results) => {
        if (err) {
            console.error('Error inserting data into the "login" table:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // Sending the response
        res.status(200).json({ status: 200, error: null, response: results });
    });
});

app.post('/book_issue_log', (req, res) => {
    const data = {
        book_issue_id: req.body.isbn,
        Student_id: req.body.stu_id,
        issue_by: req.body.name,
        reference: req.body.reference
    };

    const sql = 'INSERT INTO book_issue_log SET ?';

    db1.query(sql, data, (err, results) => {
        if (err) {
            console.error('Error inserting data into the "login" table:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // Sending the response
        res.status(200).json({ status: 200, error: null, response: results });
    });
});

app.post('/students', (req, res) => {
    const data = {
        Student_id: req.body.stu_id,
        name: req.body.name,
        reference: req.body.reference,
        branch: req.body.branch,
        year: req.body.year,
        books_id: req.body.isbn,
    };

    const sql = 'INSERT INTO students SET ?';

    db1.query(sql, data, (err, results) => {
        if (err) {
            console.error('Error inserting data into the "login" table:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // Sending the response
        res.status(200).json({ status: 200, error: null, response: results });
    });
});

app.post('/student_categories', (req, res) => {
    const data = {
        category: req.body.branch,
        max_allowed: 5

    };

    const sql = 'INSERT INTO student_categories SET ?';

    db1.query(sql, data, (err, results) => {
        if (err) {
            console.error('Error inserting data into the "student_categories" table:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // Sending the response
        res.status(200).json({ status: 200, error: null, response: results });
    });
});


app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db1.query(sql, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});

app.get('/books', (req, res) => {
    const sql = 'SELECT * FROM books';
    db1.query(sql, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});
//get all category:
app.get('/books', (req, res) => {
    const sql = 'SELECT DISTINCT category FROM books';
    db1.query(sql, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});


app.get('/book_issue', (req, res) => {
    const sql = 'SELECT * FROM book_issue';
    db1.query(sql, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});

app.get('/book_issue_log', (req, res) => {
    const sql = 'SELECT * FROM book_issue_log';
    db1.query(sql, (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});
app.delete('/book_issue_log/:book_issue_id', (req, res) => {
    const book_issue_id = req.params.book_issue_id;

    // SQL query to delete record with the specified book_issue_id
    const sql = `DELETE FROM book_issue_log WHERE book_issue_id = ?`;

    // Execute the SQL query
    db1.query(sql, [book_issue_id], (err, result) => {
        if (err) {
            console.error('Error deleting record:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('Record deleted successfully');
            res.status(200).json({ message: 'Record deleted successfully' });
        }
    });
});
app.get('/api/data', (req, res) => {
    const sql = `
    SELECT 
      book_issue.book_id, 
      book_issue.Student_Id, 
      book_issue.added_at_timestamp,
      book_issue.Name,
      books.title
    FROM 
      book_issue 
    INNER JOIN 
      books 
    ON 
      book_issue.book_id = books.book_id
  `;
    db1.query(sql, (err, result) => {
        if (err) {
            res.status(500).send('Error fetching data');
            throw err;
        }
        res.json(result);
    });
});

app.listen(8801, () => {
    console.log('Listening on port 8801...');
});
