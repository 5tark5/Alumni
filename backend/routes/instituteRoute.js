const express = require("express");
const Institute = require("../models/institueModel");
const { signupInstitute ,loginInstitute } = require("../controllers/insituteController");

const router = express.Router();

router.route('/login')
    .get((req,res)=> {
        console.log("Render to Institute Login Page");
        res.send("Render to Institute Login Page")
    })
    .post(loginInstitute);

router.route('/signup')
    .get((req,res)=> {
        console.log("Render to Institute SignUp Page");
        res.send("Render to Institute SignUp Page")
    })
    .post(signupInstitute);


module.exports = router;