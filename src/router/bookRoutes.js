import express from "express"
import {addBook,getBooks, getBookById,updateBookById,deleteBookById,checkAvailability,addReaction,} from "../controller/bookController.js"


const router = express.Router()

router.post("/books", addBook);
router.get("/books", getBooks);
router.get("/books/:id", getBookById);
router.put("/books/:id", updateBookById);
router.delete("/books/:id", deleteBookById);
router.get("/books/:id/copies", checkAvailability);
router.patch("/books/:id/:reaction", addReaction);


export default router