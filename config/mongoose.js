// Require the library
const mongoose = require('mongoose');


//  Connect to the database
mongoose.connect('mongodb://localhost/contacts_list_');

// Accquire the connection to check if it's successful
const db = mongoose.connection;

// if error print the message
db.on('error', console.error.bind(console, 'error connecting to db'));

// if up and running then print the message
db.once('open', function() {
    console.log('Successfully connected to database');
});