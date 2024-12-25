var express = require('express');
var router = express.Router();

const userModel = require('../models/user-model');
const postModel = require('../models/post-model');
const isLoggedIn = require('../middlewares/isLoggedIn.js');
const upload = require('./multer.js');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
passport.use(new localStrategy(userModel.authenticate()));

// Serialize and Deserialize user
passport.serializeUser(function(user, done) {
  done(null, user.id); // Store the user id in the session
});

passport.deserializeUser(async function(id, done) {
  try {
    // Using async/await to handle the result
    const user = await userModel.findById(id); 
    done(null, user); // Pass the user to the next middleware
  } catch (err) {
    done(err); // Handle any errors
  }
});

/* GET users listing. */
router.post('/register', function(req, res) {
  try {
    let {username, fullname, email, password} = req.body;

    let user = new userModel({
      username,
      email,
      fullname,
    });

    userModel.register(user, password)
    .then(function(){
      passport.authenticate('local')(req, res, function(){
        req.flash('success', 'Registration successfull, login!');
        res.redirect('/users/profile')
      })
    })


  } catch (error) {
    req.flash('error', 'Something went wrong, try again!');
    res.redirect('/')
  }
  
});

router.get('/login',function(req, res){
  res.render('login',{error: req.flash('error')})
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/users/profile',
  failureRedirect: '/users/login',
  failureFlash: true,
}),function(req, res) {
  // try {
  //   let {email, password} = req.body;

  //   let user = await userModel.findOne({email: email});
  //   if(user.email === email){
  //     res.send(user)
  //   }
  //   req.flash('success', 'Registration successfull, login!');
  //   res.redirect('/profile')

  // } catch (error) {
  //   req.flash('error', 'Something went wrong, try again!');
  //   res.redirect('/');
  // }
  
});

router.get('/profile', isLoggedIn, async function (req, res, next) { 
  console.log(req.session.passport.user)
  const user = await userModel.findOne({
    _id: req.session.passport.user,
  }).populate('posts'); 

  res.render('profile',{user})
});

router.get('/feed', isLoggedIn, function(req, res){ 
  res.render('feed')
});

router.post('/createpost', isLoggedIn, upload.single('file'),  async function(req, res) {
  try {    
    if(!req.file) {
      return res.status(400).send('No file were uploaded.')
    }
    const user = await userModel.findOne({_id: req.session.passport.user})
    const post = await postModel.create({
      postcaption : req.body.postcaption,
      image : req.file.filename,
      user : user._id,
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect('/users/profile')
  } catch (error) {
    res.send(error)
  }
  
});

router.post('/logout', isLoggedIn, function (req, res){
    req.logout(function(err){
      if(err) {return next(err);}
      res.redirect('/')
    })
});

module.exports = router;
