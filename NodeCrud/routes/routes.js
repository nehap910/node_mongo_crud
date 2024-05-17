const express = require('express')
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');



//Image Upload

var storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + " " + Date.now + " " + file.originalname);

        }
    }
);

var upload = multer({
    storage: storage
}).single('image');



//insert records of user into database route

router.post('/add', upload, (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename,
    });
    user.save((err) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' });
        } else {
            req.session.message = {
                type: 'success',
                message: 'user added Successfully'
            };
            res.redirect("/");
        }
    });

    // let output;
    // (async () => {
    //    output = await user.save();
    //    console.log(output);
    // })
});
// Get all Users route
router.get("/", (req, res) => {
    //res.render('index',{title:'Home Page'});
    User.find().exec((err, users) => {
        if(err){
            res.json({ message: err.message });
        }else {
            res.render("index", {
                title: "Home Page",
                users: users,
            })
        }
    });
});

router.get('/add', (req, res) => {
    res.render("add_users", { title: "Add users" });
});

module.exports = router;