 import Book from "../models/book";
import bookValidation from "../models/bookValidation";
 import BookValidation from "../models/bookValidationookValidation"

 const notFound = new Error("Book not found")


const addBook = async(req, res) => {
    try {
        const {error, value} = BookValidation(req.body);
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
        const {genere, author, publishedYear} = req.body;
        const filter = {};

        if (genere) filter.generd = genere;
        if (author) filter.author = author;
        if (publishedYear) filter.publishedYear = publishedYear;

        const books = await Book.find(filter);
        if (!books) return errorResponse(res, notFound, 404);

        res.status(200).json({books});

    }catch(err){
        errorResponse(res, err)
    }
}


const getBookById = async(req, res) =>{
    try{
        const {id} = req.params;
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

        const {error, value} = bookValidation.validate(req.body);
        if (error) return errorResponse(res, error, 400);

        const updatedBook = await Book.findByIdAndUpdate(id, value, {new:true});
        if (!updatedBook) return errorResponse(res, notFound, 404);

        res.status(200).json({ message : "Book updated successfully", book : updatedBook});

    }catch(err){
        errorResponse(res, err);
    }
}

const deleteBooks = async(req, res) => {
    try{
        const {id} = req.params;

        const deletedBook = Book.findByIdAndDelete(id);
        if (!deletedBook) return errorResponse(res, notFound, 400);

        res.status(200).json({message: "Book deleted Successfully", book: deletedBook})
    }catch(err){
        errorResponse(res, err);
    }
}

const checkAvailability = async(req, res) =>{
    try{
        const {id} = req.params;

        const book = Book.findById(id);
        if (!book) return errorResponse(res, notFound, 404);
        
        res.status(200).json({ title: book.title, numberOfAvailableCopies : book.NumberOfAvailableCopies})
    }catch(err){
        errorResponse(res, err)
    }
}

const addReaction = async(req, res) => {
    try{
        const {id} = req.params;
        const {type} = req.body;

        if (!["like", "dislike"].includes(type)){
            return errorResponse(res, new Error("Invalid Reaction type"), 400);
        }

        const updatedReaction = type === "like" ? {$inc: {like : 1}} : {$inc : {dislike : 1}};
        const updatedBook = await Book.findByIdAndUpdate(id, updatedReaction, {new : true});
        if (!updatedBook) return errorResponse(res, notFound, 404);

        res.status(200).json({message: "Reaction added successfully", Reaction : updatedBook.updatedReaction})

    }catch(err){
        errorResponse(res, err);
    }
}


export { 
    addBook,
    getBooks,
    getBookById,
    updateBookById,
    deleteBooks,
    checkAvailability,
    addReaction,
};




























const errorResponse = (res, error, statusCode = 500) => {
    res.status(statusCode).json({error:error.message || "Internal Server Error"})
};



