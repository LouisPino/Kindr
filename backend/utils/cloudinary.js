const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CL_NAME,
  api_key: process.env.CL_APIKEY,
  api_secret: process.env.CL_SECRET
})

module.exports = cloudinary;