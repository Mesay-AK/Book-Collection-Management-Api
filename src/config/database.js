import mongoose from "mongoose";




const connectDataBase = async(MONGO_URI) => {
    try {
        if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
        const connect = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });

        console.log(`Mongo Connected : ${connect.connection.host}`);
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
}

export default connectDataBase