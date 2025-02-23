const express = require('express');
const Router = express.Router();
const {Pool} = require("pg")
const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'BooksDB',
    password: 'yehia',
    port : 5432
,
    idleTimeoutMillis: 300
});

Router.get('/books', async(request,response) => {
    const FetchBooks = await pool.query('SELECT * FROM books');
    response.json(FetchBooks.rows);
});

Router.post('/books', async(request, response) => {
    const {
        title, author, published_year
    } = request.body;
    const InsertBookQuery = 'INSERT INTO books (title, author, published_year) values ($1, $2, $3) RETURNING *';
    try {
        const result = await pool.query(InsertBookQuery, [title, author, published_year]);
        response.status(201).json(result.rows[0]);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }

});

Router.put('/books/:id', async(request, response) => {
    const {id} = request.params;
    const {
        title, author, published_year
    } = request.body;
    const updateBookQuery = "UPDATE books set title = $1, author = $2, published_year = $3 Where id = $4 RETURNING *";
    const updateBook = await pool.query(updateBookQuery, [title,author,published_year,id]);
    response.json(updateBook.rows[0]);
})

Router.delete('/books/:id', async(request,response ) => {
    const{id} = request.params;
    await pool.query('DELETE From books WHERE id = $1', [id]);
    response.json({Book: 'Deleted Successfully...'});

    
})


module.exports = Router;
