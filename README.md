# Book Collection Management API

## Description

The **Book Collection Management API** is a RESTful API built with **Node.js**, **Express**, and **MongoDB**. It allows users to manage a collection of books with features like adding, updating, deleting, and searching books based on various filters. It also supports reactions like "likes" and "dislikes" for each book.

This API follows the **MVC (Model-View-Controller)** design pattern and includes validation and error handling to ensure data integrity and user-friendly responses.

---

## Features

- **CRUD Operations**:
  - Add a new book
  - Update book details
  - Delete a book
  - Fetch a book by ID
  - Fetch all books with filtering (by genre, author, or published year)
  
- **Reactions**:
  - Like or dislike a book

- **Validation**:
  - Input validation for all requests

---

## Requirements

- **Node.js** (v14 or higher)
- **MongoDB** (either locally installed or use a cloud database like MongoDB Atlas)

---

# Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Mesay-AK/Book-Collection-Management-Api.git
cd Book-Collection-Management-Api
```
### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Enviromental Variables

```bash
MONGO_URI=mongodb://localhost:27017/book_collection
PORT=5000
```

### 4. Running the Server
- For Production(using Node.js):

 ```bash
 npm start 
 ```

 - For development : You can install Nodemon

 ```bash
    npx nodemon src/app.js
```
The server will be running at http://localhost:5000/book-collection if you do not configure the port in your .env. 

# EndPoints

***1. Add a New Book - POST /books***

Adds a new book to the collection.

***2. Get All Books - GET /books***

- Fetches all books with optional query parameters to filter by genre, author, or publishedYear.

    EXample:
        GET /books?genre=Fiction&author=F. Scott

***3. Get Book by ID - GET /books/:id***

- Fetches a book by its unique ID.

    URL Parameter:
        id: The unique ID of the book.

***4. Update Book by ID - PUT /books/:id***

- Updates the details of an existing book.

    URL Parameter:
        id: The unique ID of the book.

***5. Delete a Book - DELETE /books/:id***

- Deletes a book by its unique ID.

    URL Parameter:
        id: The unique ID of the book.

***6. Add Reaction (Like/Dislike) - PATCH /books/:id/:reaction/***

 - Adds a like or dislike to the book.

  URL Parameters:
      id: The unique ID of the book.
      reaction: like or dislike.

***7. Check availabilty of copy - GET /books/:id/copies***

- Checks if a copy of a book is available by its unique ID.

    URL Parameter:
        id: The unique ID of the book.



## Validation & Error Handling

*Validation: All endpoints are validated using Joi or custom validation logic.*

*Error Handling: The API returns consistent error responses with status codes and error messages in case of invalid inputs or operations.*

## Testing the API with Postman
*You can test the API endpoints using Postman. Make sure to set the correct HTTP method (GET, POST, PUT, DELETE, PATCH) and provide the necessary parameters in the request body or URL.*
