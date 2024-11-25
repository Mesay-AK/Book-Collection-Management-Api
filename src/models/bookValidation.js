import joi from "joi";

const BookValidation = joi.object({
    title: joi.string().required(),
    author: joi.string().required(),
    isbn : joi.number().required(),
    publishedYear: joi.number().integer().min(1000).max(new Date().getFullYear()).required(),
    genre: joi.string().required(),
    summary: joi.string().allow(""),
    numberOfAvailableCopies: joi.number().integer().min(0).required(),
    likes:joi.number().forbidden(),
    disLikes:joi.number().forbidden()
})

const updateBookValidation = joi.object({
    _id : joi.string().required(),
    title: joi.string().optional(),
    author: joi.string().optional(),
    isbn : joi.number().optional(),
    publishedYear: joi.number().integer().min(1000).max(new Date().getFullYear()).optional(),
    genre: joi.string().optional(),
    summary: joi.string().allow("").optional(),
    numberOfAvailableCopies: joi.number().integer().min(0).optional(),
    likes:joi.number().forbidden(),
    disLikes:joi.number().forbidden()
});


export { BookValidation, updateBookValidation};


