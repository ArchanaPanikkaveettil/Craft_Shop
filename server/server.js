// ---Import required modules---

const express = require('express'); // Import the Express library/framework
// const bodyParser = require('body-parser');
const mongoose = require('mongoose')// Import the Mongoose library

// ---Create an Express application---
const app = express();

// Import route files
const userRouter = require('./routes/userRouter');
const shopRouter = require('./routes/shopRouter');
const loginRouter = require('./routes/loginRouter');


//----- Use middleware to parse incoming requests------

//-- METHOD 1 -- 
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

//-- METHOD 2 --
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});





// ---- Define routes ----

app.use('/user', userRouter);
app.use('/shop', shopRouter);
app.use('/login', loginRouter);




// ---- Define a port to listen on ---- 
const PORT = 3000; //OR -> const PORT = process.env.PORT || 3000;


// ---- Connect to the database ----
mongoose.connect('mongodb+srv://archanapanikkaveettil:archanapanikkaveettil@cluster0.epgktsx.mongodb.net/craftDB')
    .then(() => {

        // ---- Start the server ----
        app.listen(PORT, () => {

            console.log(`Server is running on port ${PORT}`);

        });

    }).catch((error)=>{
        console.log(error);
    })
