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
const articleController = require('./articles/ArticlesController.js');
const Article = require('./articles/Article.js');
const Category = require('./categories/Category.js')
app.set('view engine', 'ejs');

app.use('/', categoryController);
app.use('/', articleController);

app.get('/', async (req, res) => {
    const articles = await Article.findAll({ order: [['id', 'DESC']] });
    const categories = await Category.findAll();
    res.render('index', { articles: articles, categories: categories })
});

app.get('/:slug', async (req, res) => {
    const { slug } = req.params;
    const article = await Article.findOne({ where: { slug: slug } });
    res.render('article', { article: article })
});

app.get('/category/:slug', async (req, res) => {
    const { slug } = req.params;
    const CategoryArticles = await Category.findOne({ where: { slug: slug }, include: [Article] });
    const categories = await Category.findAll();
    res.render('index', { articles: CategoryArticles.articles, categories: categories })
});






app.listen(3000, () => {
    console.log('=== SERVER ON');

})