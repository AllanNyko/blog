const express = require('express');
const router = express.Router();
const Category = require('../categories/Category')
const Article = require('../articles/Article');
const { default: slugify } = require('slugify');

//ROTAS RENDER
router.get('/admin/articles', (req, res) => {
  Article.findAll().then((artigos) => {
    res.render('admin/articles/index', { artigos: artigos })
  })

});

router.get('/admin/articles/new', (req, res) => {
  Category.findAll().then((categorias) => {
    res.render('admin/articles/new', { categorias: categorias })
  })
});


// ROTAS MANIPULACAO

router.post('/admin/article/save', (req, res) => {
 
  let { title, body, category } = req.body;
 
  Article.create({
    title: title,
    slug: slugify(title),
    body: body,
    categoryId: category
  }).then(() => res.redirect('/admin/articles'));
  
});


router.get('/admin/articles/edit/:id', (req, res) => {
  let { id } = req.params;
  Article.findByPk(id).then((article) => {
    if (article != undefined) {
      res.render('admin/articles/edit', { article: article });
    } else {
      res.redirect('/admin/articles');
    }
  })
});

router.post('/admin/articles/delete', (req, res) => {
  let { id } = req.body;
  Article.destroy({ where: { id: id } }).then(() => {
    res.redirect('/admin/articles');

  })
});

router.post('/admin/articles/update', (req, res) => {
  const { id, body } = req.body;
  Article.update(
    { body: body, slug: slugify(body) },
    { where: { id: id } })
    .then(() => res.redirect('/admin/articles'))

});



module.exports = router;