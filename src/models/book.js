const mongoose = require("mongoose")

const Book = new mongoose.Schema({
    title : {type: String, required: true},
    author : {type: String, required: true},
    isbn : {type: Number, required: true},
    publishedYear: {type: Number, required:true},
    genre: {type: String, required: true}

})s