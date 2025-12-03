import dotenv from "dotenv";
import connectDB from "./db/index.js";


dotenv.config({
    path: "./env"
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port : 
            ${process.env.PORT || 8000}`);
    })})
.catch((err) => {
    console.log("Failed to connect to DB", err);
})



// ( async () => {
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error) => {
//         console.log("ERROR: ", error);
//         throw error
//         })

//         app.listen(process.env.PORT, () => {
//         console.log(`App is listening on port ${process.env.PORT}`);
//         })
//     }

//     catch (error){
//         console.log("ERROR: ", error)
//         throw err
//     }
// }) ()