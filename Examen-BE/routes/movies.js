const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async function(req, res) {
    const take = parseInt(req.query.take) || 10;
    const skip = parseInt(req.query.skip) || 0;
    const total  = await (await prisma.movies.findMany()).length;
    const movies = await prisma.movies.findMany({take, skip});
    console.log('>>>', movies);
    res.json({
      data: movies,
      pagination : {
          count : total, // Total des enregistrements
          take,   // Nombre d'éléments sélectionnés
          skip   // Décalage à partir duquel on prend les  donnéess

      }
    });

});

module.exports = router;