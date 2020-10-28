const express = require('express');
const router = express.Router();

const PokemonModel = require('../models').Pokemon;

//     GET ALL - INDEX / SEQUELIZE   //
router.get("/", (req, res) => {
    PokemonModel.findAll().then(allPokemonFromDB => {
        res.render("index.ejs", {
            pokemon: allPokemonFromDB,
        })
    })
  });
      // res.render("index.ejs", { pokemon:pokemon});


//      NEW     //
  router.get("/new", (req, res) => {
    res.render("new.ejs");
  });


//  CREATE  //
//   router.post("/", (req, res)=>{
//     pokemon.push(req.body);
//     console.log(pokemon);
//     let newPokemonIndex = pokemon.length - 1;
//     res.redirect(`/pokemon/${newPokemonIndex}`);  // redirects to another page //
// });

//  CREATE - SEQUELIZE  //
// router.post("/", (req, res)=>{
//     PokemonModel.create(req.body).then((newPokemon) => {
//         res.redirect("/pokemon");
//     });
// });

router.post("/", (req, res) => {
  if (req.body.img === "on") {
    req.body.img = true;
  } else {
    req.body.img = false;
  }
  Pokemon.create(req.body).then((newPokemon) => {
    res.redirect("/pokemon");
  });
  });

//  SHOW - INDEX   //
// router.get("/:index", (req, res) => {
//     console.log(req.params.index);
//     res.render("show.ejs", {
//     pokemon: pokemon[req.params.index],
//     index: req.params.index
//     });
// });

//  SHOW - SEQUELIZE    //
router.get("/:id", (req, res) => {
    PokemonModel.findByPk(req.params.id, {
      include : [{
        model: Player,
        attribute: ['name'],
      },
      {
        model: Team,
      },
      ],
      attributes: ['name', 'img']
    })
      .then((singlePokemon) => {
        res.render("show.ejs", {
            pokemon: singlePokemon,
        });
    });
});


//   EDIT - INDEX   //
// router.get('/:index/edit', function(req, res){
//     res.render(
//         'edit.ejs', //render views/edit.ejs
//         { //pass in an object that contains
//             pokemon: pokemon[req.params.index], //the fruit object
//             index: req.params.index //... and its index in the array
//         }
//     );
// });

//    EDIT - SEQUELIZE   //
router.get("/:id/edit", (req, res) => {
    PokemonModel.findByPk(req.params.id).then((pokemonToEdit) => {
      res.render("edit.ejs", {
        pokemon: pokemonToEdit,
      });
    });
  });

// router.put('/:id', (req, res) => { //:index is the index of our fruits array that we want to change
//     pokemon[req.params.index] = req.body; //in our fruits array, find the index that is specified in the url (:index).  Set that element to the value of req.body (the input data)
//     res.redirect('edit.ejs'); //redirect to the index page
// });

router.put('/:id', (req, res) => {
    PokemonModel.update(req.body, {where: {id: req.params.id },
     returning: true,
    plain: true,
  }).then((updatePokemon) => {
    console.log(updatePokemon);
        res.redirect("/pokemon");
        });
    });

    // router.put('/:id', (req, res) => {
    //   console.log(req.body);
    //   if (req.body.)

//   DELETE - INDEX   //
// router.delete('/:index', (req, res) => {
// 	pokemon.splice(req.params.index, 1); 
// 	res.redirect('/pokemon');  
// });

//  DELETE - SEQUELIZE  //
router.delete("/:id", (req, res) => {
    PokemonModel.destroy({ where: { id: req.params.id } }).then(() => {
      res.redirect("/pokemon");
    });
  });

module.exports = router;