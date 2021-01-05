const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var swaggerjsdoc=require('swagger-jsdoc');
var swaggerUI= require('swagger-ui-express');
var app = express();
//Configuring express server
app.use(bodyparser.json());

//MySQL details
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dipak',
    database: 'swaggerapi',
    multipleStatements: true
    });
    mysqlConnection.connect((err)=> {
        if(!err)
        console.log('Connection Established Successfully');
        else
        console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
        });

        const options = {
            definition: {
              openapi: "3.0.0",
              info: {
                title: "Express API with Swagger",
                version: "0.1.0",
                description:
                  "This is a simple API application made with Express and documented with Swagger",
              },
            },
            apis: ["./index.js"],
        };
    const specs = swaggerjsdoc(options);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs, { explorer: true })
    );


//Creating GET Router to fetch all the book details from the MySQL Database
/**
*  @swagger
*   components:
*     schemas:
*       Book:
*         type: object
*         required:
*           - title
*           - author
*         properties:
*           id:
*             type: integer
*             description: The auto-generated id of the book.
*           title:
*             type: string
*             description: The title of your book.
*           author:
*             type: string
*             description: Who wrote the book?
*           createdAt:
*             type: string
*             format: date
*             description: The date of the record creation.
*         example:
*            title: The Pragmatic Programmer
*            author: Andy Hunt / Dave Thomas
*/
/**
* @swagger
* tags:
*   name: Books
*   description: API to manage your books.
*/

/**
* @swagger
* path:
* /books:
*   get:
*      summary: Lists all the books
*      tags: [Books]
*      responses:
*        "200":
*          description: The list of books.
*          content:
*          application/json:
*/

app.get('/books' , (req, res) => {
    mysqlConnection.query('SELECT * FROM books', (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } );

//Router to INSERT/POST a book's detail
/**
 * @swagger
 * path:
 * /books:
 *     post:
 *      summary: Creates a new book
 *      tags: [Books]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  type:
 *                  properties:
 *                      name1:
 *                         type: string
 *                      author:
 *                          type: string
 *                  required:
 *                      -name1
 *                      -author
 *      responses:
 *        "200":
 *          description: The created book.
 *          content:
 *            application/json:
 */
app.post('/books', (req, res) => {
    id=req.body.id,
    name1 = req.body.name, 
    author = req.body.author,
    created_at= req.body.created_at  
    let sql = "INSERT INTO `books` (name, author) VALUES (?,?)";
    console.log(name1);
    console.log(author);         
 
    mysqlConnection.query(sql, [name1, author], (err, rows, fields) => {
        if(!err) 
          res.send("User successfully added");
        else 
          console.log(err);
     });
 });

//Router to GET specific learner detail from the MySQL database
/**
 * @swagger
 * path:
 * /books/{id}:
 *    get:
 *      summary: Gets a book by id
 *      tags: [Books]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The book id
 *      responses:
 *        "200":
 *          description: The list of books.
 *          content:
 *            application/json:
 *        "404":
 *          description: Book not found.
 */

app.get('/books/:id' , (req, res) => {
    mysqlConnection.query('SELECT * FROM books WHERE id = ?',[req.params.id], (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } );

//Router to UPDATE a learner's detail
/**
 * @swagger
 * path:
 * /books/{id}:
 *    put:
 *      summary: Updates a book
 *      tags: [Books]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The book id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  type:
 *                  properties:
 *                      name:
 *                         type: string
 *                      author:
 *                          type: string
 *                  required:
 *                      -name1
 *                      -author
 *      responses:
 *        "204":
 *          description: Update was successful.
 *        "404":
 *          description: Book not found.
 *          content:
 *              application/json:
 */

app.put('/books/:id',(req, res) => {
    // if (err) throw err;
     id=req.params.id,
     name1 = req.body.name, 
     author = req.body.author
     var sql = 'UPDATE books SET name = ?,author= ? WHERE id = ?';
     mysqlConnection.query(sql,[name1,author,id],(err, result) => {
        if (err) 
            throw err;
        console.log(result.affectedRows + " record(s) updated");
     });
   });
   
//Router to DELETE a learner's detail
/**
 * @swagger
 * path:
 * /books/{id}:
 *    delete:
 *      summary: Deletes a book by id
 *      tags: [Books]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The book id
 *      responses:
 *        "204":
 *          description: Delete was successful.
 *        "404":
 *          description: Book not found.
 */
app.delete('/books/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM books WHERE id = ?', [req.params.id], (err, rows, fields) => {
    if (!err)
    res.send('Book deleted successfully.');
    else
    console.log(err);
    })
    });

//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
