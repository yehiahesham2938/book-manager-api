const express = require("express")
const app = express();
const port = 3000;
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

app.use(express.json());

// const test = async() => {
//     const result = await pool.query('SELECT * FROM books');
//     console.log('query Result: ', result.rows);

// }

// test();

app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(__dirname + '/public/SimpleInterface.html'));

//  app.use(express.static('public'));
const routes = require('./Routes');
app.use('/api', routes);

app.listen(port, ()=> {
    console.log('sever at port: ${port}')
})