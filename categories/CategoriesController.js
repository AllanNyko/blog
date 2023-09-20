const express = require('express');
const router = express.Router();
const Category = require('./Category');
const slugify = require('slugify');

// ROTAS DE NAVEGACAO

router.get('/admin/categories', async (req, res) => {
  const data = await Category.findAll({ raw: true });
  console.log(data);
  res.render('admin/categories/index', { data: data });
});

router.get('/admin/categories/new', (req, res) => {
  res.render('admin/categories/new');
});




//ROTAS PARA EXECUCAO

router.post('/categories/save', (req, res) => {
  const { title } = req.body;
  if (title != undefined) {
    Category.create({
      title: title,
      slug: slugify(title)
    }).then(() => res.redirect('/admin/categories'))
  } else {
    res.send('erro erro');
  }
});


router.post('/categories/delete', (req, res) => {
  const { id } = req.body;
  if (id != undefined) {
    if (!isNaN(id)) {
      Category.destroy({
        where: {
          id: id
        }
      }).then(() => res.redirect('/admin/categories'))
    } else {
      res.redirect('/admin/categories');
    }

  } else {
    res.redirect('/admin/categories');
  }
});

router.get('/admin/categories/edit/:id', (req, res) => {
  let { id } = req.params;
  Category.findByPk(id).then((categoria) => {
    if (categoria != undefined) {

      res.render('admin/categories/edit', { categoria: categoria });
    } else {
      res.redirect('/admin/categories');
    }
  })


});

router.post('/categories/update', (req, res) => {
  const { id, title } = req.body;
  Category.update(
    { title: title },
    { where: { id: id } })
    .then(() => res.redirect('/admin/categories'))

});


module.exports = router;