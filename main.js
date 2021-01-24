const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
//const mongoose = require('mongoose')
const app = express()

const port = process.env.PORT || 3000

// MIDDLEWARE
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// STATIC - formerly the templates folder, now the public folder
app.use('/', express.static('public'))

// ROUTING
/* API GUIDE - not set in stone because the API currently isn't working.
Do not change how this works until we completely abandon the PHP version of the site.

/costumes
returns all costumes

/search 
returns costumes from one decade. specify which decade by adding a / after search, and the decade you want.
example: /api/search/1850

/yearssearch
requires a year_from and a year_to parameter. 
decades are separated by a /. for example:
if you wanted to search for costumes from 1850 to 1860, you need to format your URL like the following:
/api/yearssearch/1850/1860

*/

// NOTE: right now this app doesn't rely on a backend. in the future, in order to make a system that allows somebody to add, modify and delete costumes, a database will be required.
const costumes = require('./json/costumes.json')

const sortByYearGap = (a, b) => {
    if (a.year_to - a.year_from > b.year_to - b.year_from) {
        return 1
    }
    if (a.year_to - a.year_from < b.year_to - b.year_from) {
        return -1
    }
    return 0
}

const sortByYearFrom = (a, b) => {
    if (a.year_from > b.year_from) {
        return 1
    }
    if (a.year_from < b.year_from) {
        return -1
    }
    return 0
}

app.get('/api/costumes', (req, res) => {
    console.log(req.url)
    let results = costumes.sort(sortByYearFrom)
    res.json(costumes)
})

app.get('/api/search/:decade', (req, res) => {
    console.log(req.url)
    // TODO: add error handling?
    let results = costumes.filter(costume => {
        return costume.year_from <= req.params.decade && costume.year_to >= req.params.decade
    })
    results.sort(sortByYearGap)
    res.json(results)
})

app.get('/api/yearssearch/:year_from/:year_to', (req, res) => {
    console.log(req.url)
    let results = costumes.filter(costume => {
        return costume.year_from <= req.params.year_from && costume.year_to >= req.params.year_to
    })
    results.sort(sortByYearGap)
    res.json(results)
})
 
app.listen(port, () => { console.log(`Server running on port ${port}`) })