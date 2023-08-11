var express = require('express');
var router = express.Router();
var userdata = require("./users")
const localStrategy = require("passport-local")
const passport = require("passport")
var friends = require("./friends")
var post = require("./post")
var Path = require("path")
var multer = require("multer")
passport.use(new localStrategy(userdata.authenticate()))

function isloggedin(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  }
  else {
    res.redirect("/")
  }
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
    var dt = new Date()
    var fn = Math.floor(Math.random() * 100000000) + dt.getTime() + Path.extname(file.originalname)
    cb(null, fn)
  }
})

const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/postuploads')
  },
  filename: function (req, file, cb) {
    var dt = new Date()
    var fn = Math.floor(Math.random() * 100000000) + dt.getTime() + Path.extname(file.originalname)
    cb(null, fn)
  }
})
const upload = multer({ storage: storage })
const postUpload = multer({ storage: storage2 })
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index',);
});


router.get('/register', function (req, res, next) {


  res.render('register');
});

router.post('/create', function (req, res, next) {
  var user = new userdata({
    First_Name: req.body.firstname,
    Last_name: req.body.lastname,
    username: req.body.username,
    date: req.body.date,
    month: req.body.month,
    year: req.body.year,
    Gender: req.body.gender
  })
  userdata.register(user, req.body.password).then(function (u) {
    passport.authenticate("local")(req, res, function () {
      res.redirect('/');
    })
  })
});


router.post("/login", passport.authenticate('local', {
  successRedirect: '/loggedin',
  failureRedirect: '/'
}), function (req, res, next) { })

router.get("/loggedin", isloggedin, function (req, res, next) {
  userdata.findOne({ username: req.session.passport.user }).then(function (u) {
    res.render("loggedin", { userdata: u })
  })

})



router.get("/profilepage", isloggedin, function (req, res, next) {

  userdata.findOne({ username: req.session.passport.user }).then(function (u) {

    res.render("profilepage", { userdata: u })
  })

})

router.post("/uploadprofile", upload.single('profileimg'), function (req, res, next) {
  userdata.findOne({ username: req.session.passport.user }).then(function (foundeduser) {

    foundeduser.profile = req.file.filename

    foundeduser.save().then(function () {
      res.redirect("back")
    })
  })
})


router.get("/search/:input", isloggedin, function (req, res, next) {
  var regexp = new RegExp("^" + req.params.input, "i");

  userdata.find({ First_Name: regexp }).then(function (user) {
    res.json({ name: user })


  })
})
router.get("/dp", isloggedin, function (req, res, next) {
  userdata.findOne({ username: req.session.passport.user }).then(function (user) {
    // console.log(user)
    res.json({ profile: user })


  })
})

router.get("/findall", isloggedin, function (req, res, next) {
  userdata.find().then(function (alluser) {
    res.json({ alluser: alluser })
  })
})

router.get("/usersprofilepage/:userid",isloggedin,function(req,res,next){
  userdata.findOne({_id:req.params.userid}).then(function(found){
    res.render("userprofilepage", { founduser: found })
  })
})





router.post("/createpost",isloggedin,postUpload.single('post'), async function(req,res,next){
 var loggedinuser = await userdata.findOne({username:req.session.passport.user})
 if(req.file === undefined){
  var createdpost = await post.create({
    userpost: loggedinuser._id,
   postdetails:req.body.postcaption
 
   
  })
 }else{
  var createdpost = await post.create({
    userpost: loggedinuser._id,
   postdetails:req.body.postcaption,
   postPic:req.file.filename
   
  })
 }


  console.log(req.file)
  loggedinuser.post.push(createdpost._id)
  await loggedinuser.save()
  
  res.redirect("back")


})

router.post("/findposts",isloggedin, async function(req,res,next){
  var postdata = await userdata.findOne({username:req.session.passport.user}).populate("post")
  res.json({ postdata: postdata })
})
 




module.exports = router;
