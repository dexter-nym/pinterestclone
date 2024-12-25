const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const path = require('path')

const postStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = uuidv4()
      cb(null, uniqueSuffix + path.extname(file.originalname))
    }
  })
  
const uploadpost = multer({ storage: postStorage })

const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/profile')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4()
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const uploadprofile = multer({ storage: profileStorage })

module.exports = {
  uploadpost,
  uploadprofile
};