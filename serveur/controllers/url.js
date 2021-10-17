const ShortUrl = require("../models/shortUrl")
const {validationResult} = require('express-validator')

exports.getAll = (req, res) => {

     ShortUrl.find( (err, shortUrls) => {
    return res.json({
      message: "Success",
      shortUrls
    })
})
}
 
exports.AddShortUrl = (req, res) => {
  
    ShortUrl.create({ full: req.body.fullUrl },(err, shortUrls) => {

         return res.json({
    message: "Success",
    shortUrls
  })
 })
}


exports.urlClicked = (req, res) => {
   ShortUrl.findOne({ short: req.params.shortUrl }, (err, shortUrl) => {  
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks++
    shortUrl.save()
  
    return res.json({
      message: "Success",
      shortUrl 
    })
   })
}
