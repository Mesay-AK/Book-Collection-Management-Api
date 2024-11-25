import Book from "../models/book.js";
import {BookValidation, updateBookValidation} from "../models/bookValidation.js";
import mongoose from "mongoose";



const notFound = new Error("Book not found")
const errorResponse = (res, error, statusCode = 500) => {
    res.status(statusCode).json({error:error.message || "Internal Server Error"})
};


const addBook = async(req, res) => {
    try {
        const {error, value} = BookValidation.validate(req.body);
        if (error) return errorResponse(res, error, 400)

        const newBook = new Book(value);
        const addedBook = await newBook.save();

        res.status(201).json({message: "Book Added Successfully", book: addedBook})
        
    }catch(err){
        errorResponse(res, err)
    }
}

const getBooks = async(req, res) =>{
    try{
        const {genre, author, publishedYear} = req.query;
        const filter = {};

        if (genre) filter.genre = genre;
        if (author) filter.author = author;
        if (publishedYear) filter.publishedYear = publishedYear;

        const books = await Book.find(filter);
        if (books.length == 0) return errorResponse(res, notFound, 404);

        res.status(200).json({books});

    }catch(err){
        errorResponse(res, err)
    }
}


const getBookById = async(req, res) =>{
    try{
        const {id} = req.params;
        
        if (!mongoose.isValidObjectId(id)) {
            return errorResponse(res, new Error("Invalid book ID"), 400)
            }
            
        const book = await Book.findById(id);
        if (!book) return errorResponse(res, notFound, 404);

        res.status(200).json({book});

    }catch(err){
        errorResponse(res, err);
    }
};


const updateBookById = async (req, res) => {
    try {
        const {id} = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return errorResponse(res, new Error("Invalid book ID"), 400)
            }

        const {error, value} = updateBookValidation.validate(req.body);
        if (error) return errorResponse(res, error, 400);

        const updatedBook = await Book.findByIdAndUpdate(id, value, {new:true});
        if (!updatedBook) return errorResponse(res, notFound, 404);

        res.status(200).json({ message : "Book updated successfully", book : updatedBook});

    }catch(err){
        errorResponse(res, err);
    }
}

const deleteBookById = async(req, res) => {
    try{
        const {id} = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return errorResponse(res, new Error("Invalid book ID"), 400)
            }

        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) return errorResponse(res, notFound, 400);

        res.status(200).json({message: "Book deleted Successfully", book: deletedBook})
    }catch(err){
        errorResponse(res, err);
    }
}

const checkAvailability = async(req, res) =>{
    try{
        const {id} = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return errorResponse(res, new Error("Invalid book ID"), 400)
            }

        const book = await Book.findById(id);
        if (!book) return errorResponse(res, notFound, 404);
        
        res.status(200).json({isbn: book.isbn, title: book.title, numberOfAvailableCopies : book.numberOfAvailableCopies})
    }catch(err){
        errorResponse(res, err)
    }
}

const addReaction = async(req, res) => {
    try{
        const {id, reaction} = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return errorResponse(res, new Error("Invalid book ID"), 400)
            }

        if (!["like", "dislike"].includes(reaction)){
                return errorResponse(res, new Error("Invalid Reaction reaction"), 400);
            }

        const updatedReaction = reaction === "like" ? { $inc: { likes: 1 } } : { $inc: { disLikes: 1 } };
        const updatedBook = await Book.findByIdAndUpdate(id, updatedReaction, { new: true })
            .select("isbn title likes disLikes");
        if (!updatedBook) return errorResponse(res, notFound, 404);

        res.status(200).json({message: "Reaction added successfully", book : updatedBook})

    }catch(err){
        errorResponse(res, err);
    }
}



export { 
    addBook,
    getBooks,
    getBookById,
    updateBookById,
    deleteBookById,
    checkAvailability,
    addReaction,
};






