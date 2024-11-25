import express from "express"
import {addBook,getBooks,getBookById,updateBookById,deleteBookById,checkAvailability,addReaction,} from "../controller/bookController"


const router = express.Router()

router.post("/book", addBook);
router.get("/books", getBooks);
router.get("books:id", getBookById),
router.put("books:id", updateBookById),
router.delete("books:id", deleteBookById),
router.get("books/:id/copies", checkAvailability),
router. get("books/:id/reaction", addBook)


export default router