const express = require('express')
const app = express();
require('dotenv').config()
const bodyParse = require('body-parser');
app.use(express.static('public'))
app.use(bodyParse.urlencoded({ extended: false }))
app.use(bodyParse.json())

require('./database/database.js')
require('./articles/Article.js')
require('./categories/Category.js')

const categoryController = require('./categories/CategoriesController.js')
const articleController = require('./articles/ArticlesController.js')
app.set('view engine', 'ejs');

app.use('/', categoryController);
app.use('/', articleController);
 
app.listen(3000, () => {
    console.log('=== SERVER ON');

})