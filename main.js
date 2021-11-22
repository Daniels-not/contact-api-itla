const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const contact = require('./router/contact');


// using and configuring the database router

app.use(express.json());
app.use('/api/contact', contact);
app.use(express.urlencoded({ extended: true }));


// connection to the database


mongoose.connect('mongodb://localhost/contactos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connection with the data base has been stablish 😃')).catch(err => console.log("Theres an error while trying to connect to the data base 🥺 " + err));



// listen for requests


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 👍`);
    console.log(`http://localhost:${PORT}`);
    console.log('Press CTRL + C to stop the server');
})