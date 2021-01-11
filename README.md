# Base_Rest_Api_NodeJs_Swagger
This is rest api on which i implemented Swagger Documentation.
To implement swagger first we need to build the rest api using Node Js, Express and Mysql.
after completion of rest api we need to install npm for swagger and the npm's are:
npm install swagger-ui-express----- this module will help us to auto generate the Swagger-UI
npm install swagger-jsdoc --save ----- this module help us by reading the  JSDoc-annotated source code and generates an OpenAPI (Swagger) specification.
after install we need to declare the variable for using swagger-ui and swagger -jsdoc
then we need to define the definition of Open API with their version and info
next we will add the documentation for the api as :-
@swagger
   components:
     schemas:
       Book:
         type: object
         required:
           - title
           - author
         properties:
           id:
             type: integer
             description: The auto-generated id of the book.
           title:
             type: string
             description: The title of your book.
           author:
             type: string
             description: Who wrote the book?
           createdAt:
             type: string
             format: date
             description: The date of the record creation.
         example:
            title: The Pragmatic Programmer
            author: Andy Hunt / Dave Thomas
 after this we need to add the description of the api:-
 @swagger
 tags:
   name: Books
   description: API to manage your books.
 now we need to create the end points for different requests by documentation
 documentation for get request is:-
 @swagger
 path:
 /books:
   get:
      summary: Lists all the books
      tags: [Books]
      responses:
        "200":
          description: The list of books.
          content:
          application/json:
documentation for post request is:-
//Router to INSERT/POST a book's detail

  @swagger
  path:
  /books:
      post:
       summary: Creates a new book
       tags: [Books]
       requestBody:
         required: true
         content:
           application/json:
               schema:
                   type:
                   properties:
                       name1:
                          type: string
                       author:
                           type: string
                   required:
                       -name1
                       -author
       responses:
         "200":
           description: The created book.
           content:
             application/json:

documentation for get request of single id is:-
//Router to GET specific learner detail from the MySQL database

  @swagger
  path:
  /books/{id}:
     get:
       summary: Gets a book by id
       tags: [Books]
       parameters:
         - in: path
           name: id
           schema:
             type: integer
           required: true
           description: The book id
       responses:
         "200":
           description: The list of books.
           content:
             application/json:
         "404":
          description: Book not found.

documntation for update/put request by id is :-
//Router to UPDATE a learner's detail

  @swagger
  path:
  /books/{id}:
     put:
       summary: Updates a book
       tags: [Books]
       parameters:
         - in: path
           name: id
           schema:
             type: integer
           required: true
           description: The book id
       requestBody:
         required: true
         content:
           application/json:
               schema:
                   type:
                   properties:
                       name:
                          type: string
                       author:
                           type: string
                   required:
                       -name1
                       -author
       responses:
         "204":
           description: Update was successful.
         "404":
           description: Book not found.
           content:
               application/json:
 documentation for delete request by id is:-
 //Router to DELETE a learner's detail

  @swagger
  path:
  /books/{id}:
     delete:
       summary: Deletes a book by id
       tags: [Books]
       parameters:
         - in: path
           name: id
           schema:
             type: integer
           required: true
           description: The book id
       responses:
         "204":
           description: Delete was successful.
         "404":
           description: Book not found.

after completition of documentation we need to run the api for the result and for that we need to follow these steps
step-1 :- npm install
step-2:- node index.js
