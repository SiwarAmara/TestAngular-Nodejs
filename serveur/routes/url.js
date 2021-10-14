const express = require("express")
const { getAll,AddShortUrl,urlClicked } = require("../controllers/url")
const {check} = require('express-validator')
const router = express.Router()

router.post('/AddshortUrls',AddShortUrl)

 router.get('/shortUrls', getAll)
 router.get('/clicked/:shortUrl', urlClicked)

module.exports = router