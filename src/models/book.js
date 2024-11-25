import mongoose from "mongoose"

const BookSchema = new mongoose.Schema({
    title : {type: String, required: true},
    author : {type: String, required: true},
    isbn : {type: Number, required: true},
    publishedYear: {type: Number, required:true},
    genre: {type: String, required: true},
    summary: {type:String,},
    numberOfAvailableCopies: {type:Number, required: true},
    Likes:{type:Number, default: 0},
    DisLikes:{type:Number, default: 0}
    
})

export default mongoose.model("Book", BookSchema)