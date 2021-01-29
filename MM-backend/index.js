require('dotenv').config();

const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");


//MY ROUTES
const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/user");
const postRoutes = require("./src/routes/post");

//DB CONNECTION
mongoose.connect("mongodb+srv://rithesh:rithesh07@meltingmedia.n5jp9.mongodb.net/MeltingMedia?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true     
    }
)
.then(() => {
    console.log("DB CONNECTED")
}).catch(() => {
    console.log("DB GOT OOPS")
});

//MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//MY ROUTES
app.use("/api",authRoutes);
app.use("/api", userRoutes);
app.use("/api", postRoutes);


//PORT
const port = process.env.PORT || 8000;


//STARTING A SERVER
app.listen(port, () => {
    console.log(`App is running at ${port}`);
});