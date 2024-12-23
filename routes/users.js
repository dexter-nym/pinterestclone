var express = require('express');
var router = express.Router();

const userModel = require('../models/user-model');
const postModel = require('../models/post-model');

/* GET users listing. */
router.post('/register', async function(req, res, next) {
  try {
    let {username, fullname, email, password} = req.body;

    let user = await userModel.create({
      username,
      password,
      email,
      fullname,
    });

    res.send(user)

  } catch (error) {
    res.send(error)
  }
  
});

router.post('/createpost', async function(req, res, next) {
  try {
    // let {username, fullname, email, password} = req.body;

    let post = await postModel.create({
      posttext: "something"
    });

    res.send(post)

  } catch (error) {
    res.send(error)
  }
  
});

module.exports = router;
