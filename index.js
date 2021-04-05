const express = require('express');

const path = require('path');

const port = 8000;

const db = require('./config/mongoose');

const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

// app.use() is middleware
app.use(express.urlencoded());


app.use(express.static('assets'));

// middleware 1
// app.use(function(req, res, next) {
//     console.log("middleware 1 called");
//     next();
// });

// middleware 2
// app.use(function(req, res, next) {
//     console.log("Middleware 2 called");
//     next();
// })





var contactList = [{
        name: "Aditya",
        phone: "8700064715"
    },

    {
        name: "Tony Stark",
        phone: "9912654718"
    },

    {
        name: "Coding Ninjas",
        phone: "9123456789"
    }
]
app.get('/practice', function(req, res) {
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});

app.get('/', function(req, res) {
    // console.log(__dirname);
    // res.send('<h1>Cool,it is running!or is it</h1>');

    Contact.find({}, function(err, contacts) {
        if (err) {
            console.log("Error in fetching contacts from db");
            return;
        }

        return res.render('home', {
            title: "Contacts List",
            contact_list: contacts
        });

    })

});



app.post('/create-contact', function(req, res) {
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);


    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    // contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact) {
        if (err) {
            console.log('error in Creating a contact!');
            return;
        }

        console.log('*********', newContact);
        return res.redirect('back');

    });

    // return res.redirect('/');
    // return res.redirect('back');
});


// for deleting a contact get the query from the url
app.get('/delete-contact/', function(req, res) {
    // get the id from the query in the url
    console.log(req.query);
    let id = req.query.id;

    // find the cintact in the database using id and delete it
    Contact.findOneAndDelete(id, function(err) {
        if (err) {
            console.log("Error in deleting an object from database");
            return;
        }
        return res.redirect('back');
    })


});









app.listen(port, function(err) {
    if (err) {
        console.log('Error in running the server', err);
    }

    console.log('Yup! My Express Server is running on port:', port);
});