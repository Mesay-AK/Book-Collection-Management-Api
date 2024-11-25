import joi from "joi";

const bookValidationSchema = joi.object({
    title: joi.string().required(),
    author: joi.string().required(),
    isbn : joi.number().required(),
    publishedYear: joi.number().integer().min(1000).max(new Date().getFullYear()).required(),
    genre: joi.string().required(),
    summary: joi.string().allow(""),
    numberOfAvailableCopies: joi.number().integer().min(0).required(),
    likes:joi.number().integer().min(0).default(0),
    disLikes:joi.number().integer().min(0).default(0)
})

export default mongoose.model("BookValidation", bookValidationSchema)


